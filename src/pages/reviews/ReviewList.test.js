/**
 * @jest-environment jsdom
 */

import React from 'react';
import { Review } from './ReviewList';
import Alert from '../../components/reviews/Alert';
import NewReview from '../../components/reviews/NewReview';
import { configure, mount, shallow, render } from "enzyme";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import { unmountComponentAtNode, render as reactRender } from 'react-dom';
import { act } from 'react-dom/test-utils';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import nock from 'nock';

configure({ adapter: new Adapter() })

const mockStore = configureMockStore();
const store = mockStore({});

let container = document.createElement("div");
beforeEach(async () => {
  container = document.createElement("div");
  document.body.appendChild(container);


  nock('http://localhost:8080').defaultReplyHeaders({ 'access-control-allow-origin': '*' })
    .get('/api/v1/reviews/client/12345').times(100)
    .reply(200, [
      {
          "title": "Returned review title 1",
          "score": 2,
          "description": "Bad thing",
          "reviewerClientId": "1",
          "reviewedProductId": "1",
          "reviewedClientId": "1",
          "comments": [
              {
                  "id": "ead85c21-83c3-4c01-a723-331949ab822a",
                  "clientId": "1",
                  "body": "Comment",
                  "date": "2021-01-08T13:51:58.373Z"
              }
          ],
          "id": "ReviewExample2",
          "dateCreated": "2021-01-08T13:50:51.850Z"
      },
      {
          "title": "Returned review title 2",
          "score": 3,
          "description": "Good thing",
          "reviewerClientId": "2",
          "reviewedProductId": "2",
          "reviewedClientId": "2",
          "comments": [
              {
                  "id": "ead85c21-83c3-4c01-a723-331949ab822b",
                  "clientId": "2",
                  "body": "Comment 2",
                  "date": "2021-01-08T14:51:58.373Z"
              }
          ],
          "id": "ReviewExample1",
          "dateCreated": "2021-01-08T14:50:51.850Z"
      }
  ]);

  nock('http://localhost:8080').defaultReplyHeaders({ 'access-control-allow-origin': '*' })
    .post('/api/v1/reviews')
    .reply(200, []);


  nock('http://localhost:80').defaultReplyHeaders({ 'access-control-allow-origin': '*' })
    .get('/static/jsons/badwords.json').times(100)
    .reply(200, {
      "badwordList": [
        "bitch",
        "asshole",
        "dick",
        "pussy"
      ]
    });
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("Should render the message of the alert", () => {
  act(() => {
    reactRender(<Alert message="Test" onCloseCallback={jest.fn()} />, container);

  });
  expect(container.hasChildNodes()).toBe(true);
  expect(container.textContent).toEqual(expect.stringContaining("Test"));
});

it("Does not render if message is null", () => {
  act(() => {
    reactRender(<Alert message={null} onCloseCallback={jest.fn()} />, container);
  });
  expect(container.hasChildNodes()).toBe(false);
});

it("Sends event if button is clicked", () => {
  const onClose = jest.fn();
  act(() => {
    reactRender(<Alert message="test" onCloseCallback={onClose} />, container);
  });

  const button = document.querySelector("[data-testid=close]");

  act(() => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  expect(onClose).toHaveBeenCalledTimes(1);
});

it("Should render the new review component", () => {
  act(() => {
    reactRender(<NewReview onAddReview={jest.fn()} />, container);

  });
  expect(container.hasChildNodes()).toBe(true);
});

it("Sends event if add review button is clicked", () => {
  const onClick = jest.fn();
  act(() => {
    reactRender(<NewReview onAddReview={onClick} />, container);
  });

  const button = document.querySelector("[data-testid=add]");

  act(() => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  expect(onClick).toHaveBeenCalledTimes(1);
});

it("Title component should exist and should be an input", async () => {
  global.window = Object.create(window);
  const url = "https://frontend.fafago-dev.alexgd.es";
  const reviewId = 12345;
  Object.defineProperty(window, 'location', {
    value: {
      location: url,
      pathname: '/reviews/client/' + reviewId
    }
  });

  let renderContent = mount(
    <Provider store={store}>
      <Review />
    </Provider>
  );

  let titleInputCheck = renderContent.exists({ name: 'title' });
  expect(titleInputCheck).toBe(true);
  let titleInput = renderContent.find({ name: 'title' }).html();
  expect(titleInput.startsWith('<input')).toBe(true);
});

it("Description component should exist and should be an input", async () => {
  global.window = Object.create(window);
  const url = "https://frontend.fafago-dev.alexgd.es";
  const reviewId = 12345;
  Object.defineProperty(window, 'location', {
    value: {
      location: url,
      pathname: '/reviews/client/' + reviewId
    }
  });

  let renderContent = mount(
    <Provider store={store}>
      <Review />
    </Provider>
  );

  let descriptionInputCheck = renderContent.exists({ name: 'description' });
  expect(descriptionInputCheck).toBe(true);
  let descriptionInput = renderContent.find({ name: 'description' }).html();
  expect(descriptionInput.startsWith('<input')).toBe(true);
});


it("Score component should exist and should be an input", async () => {
  global.window = Object.create(window);
  const url = "https://frontend.fafago-dev.alexgd.es";
  const reviewId = 12345;
  Object.defineProperty(window, 'location', {
    value: {
      location: url,
      pathname: '/reviews/client/' + reviewId
    }
  });

  let renderContent = mount(
    <Provider store={store}>
      <Review />
    </Provider>
  );
  let scoreInput;
  let scoreInputCheck;
  act(() => {
    scoreInput = renderContent.find({ name: 'customized-empty' }).at(2);
    scoreInputCheck = renderContent.exists({ name: 'customized-empty' });
  });

  expect(scoreInputCheck).toBe(true);
  expect(scoreInput.html().startsWith('<input')).toBe(true);
});


it("Should not allow an empty title", async () => {
  global.window = Object.create(window);
  const url = "https://frontend.fafago-dev.alexgd.es";
  const reviewId = 12345;
  Object.defineProperty(window, 'location', {
    value: {
      location: url,
      pathname: '/reviews/client/' + reviewId
    }
  });
  let renderContent = mount(
    <Provider store={store}>
      <Review />
    </Provider>
  );
  let descriptionInput = renderContent.find({ name: 'description' });
  let button = renderContent.find({ 'data-testid': 'add' });
  descriptionInput.prop('onChange')({ target: { name: 'description', value: 'This is a fantastic review' } });
  button.simulate('click');
  renderContent.find(Review).render();

  //Wait for state change
  await new Promise(resolve => setTimeout(() => resolve(), 500));

  expect(renderContent.find(Review).state().errorInfo).toBe('Title cannot be empty');
});


it("Should not allow an empty description", async () => {


  global.window = Object.create(window);
  const url = "https://frontend.fafago-dev.alexgd.es";
  const reviewId = 12345;
  Object.defineProperty(window, 'location', {
    value: {
      location: url,
      pathname: '/reviews/client/' + reviewId
    }
  });

  let renderContent = mount(
    <Provider store={store}>
      <Review />
    </Provider>
  );


  let titleInput = renderContent.find({ name: 'title' });
  let button = renderContent.find({ 'data-testid': 'add' });

  titleInput.prop('onChange')({ target: { name: 'title', value: 'You have been changed' } });

  button.simulate('click');
  renderContent.find(Review).render();

  //Wait for state change
  await new Promise(resolve => setTimeout(() => resolve(), 500));

  expect(renderContent.find(Review).state().errorInfo).toBe('Description cannot be empty');
});


it("Should not allow a score higher than 5", async () => {
  global.window = Object.create(window);
  const url = "https://frontend.fafago-dev.alexgd.es";
  const reviewId = 12345;
  Object.defineProperty(window, 'location', {
    value: {
      location: url,
      pathname: '/reviews/client/' + reviewId
    }
  });

  let renderContent = mount(
    <Provider store={store}>
      <Review />
    </Provider>
  );

  act(() => {
    let scoreInput = renderContent.find({ name: 'customized-empty' }).at(2);
    scoreInput.prop('onChange')({ target: { name: 'customized-empty', value: 6 } });
  });

  let titleInput = renderContent.find({ name: 'title' });
  let descriptionInput = renderContent.find({ name: 'description' });
  let button = renderContent.find({ 'data-testid': 'add' });

  titleInput.prop('onChange')({ target: { name: 'title', value: 'You have been changed' } });
  descriptionInput.prop('onChange')({ target: { name: 'description', value: 'This is a fantastic review' } });
  button.simulate('click');
  renderContent.find(Review).render();

  //Wait for state change
  await new Promise(resolve => setTimeout(() => resolve(), 500));

  expect(renderContent.find(Review).state().errorInfo).toBe('Score must be a number between 1 and 5');
});


it("Review creation is invoked and does not return errors", async () => {
  global.window = Object.create(window);
  const url = "https://frontend.fafago-dev.alexgd.es";
  const reviewId = 12345;
  Object.defineProperty(window, 'location', {
    value: {
      location: url,
      pathname: '/reviews/client/' + reviewId
    }
  });

  let renderContent = mount(
    <Provider store={store}>
      <Review />
    </Provider>
  );

  act(() => {
    let scoreInput = renderContent.find({ name: 'customized-empty' }).at(2);
    scoreInput.prop('onChange')({ target: { name: 'customized-empty', value: 4 } });
  });

  let titleInput = renderContent.find({ name: 'title' });
  let descriptionInput = renderContent.find({ name: 'description' });
  let button = renderContent.find({ 'data-testid': 'add' });

  titleInput.prop('onChange')({ target: { name: 'title', value: 'You have been changed' } });
  descriptionInput.prop('onChange')({ target: { name: 'description', value: 'This is a fantastic review' } });
  button.simulate('click');
  renderContent.find(Review).render();

  //Wait for state change
  await new Promise(resolve => setTimeout(() => resolve(), 500));

  expect(renderContent.find(Review).state().errorInfo).toBe(null);
});

it("Should show the 2 reviews associated with the client with id 12345", async () => {
  global.window = Object.create(window);
  const url = "https://frontend.fafago-dev.alexgd.es";
  const reviewId = 12345;
  Object.defineProperty(window, 'location', {
    value: {
      location: url,
      pathname: '/reviews/client/' + reviewId
    }
  });

  let renderContent = mount(
    <Provider store={store}>
      <Review />
    </Provider>
  );
  //Wait for state change
  await new Promise(resolve => setTimeout(() => resolve(), 500));

  expect(renderContent.find(Review).state().errorInfo).toBe(null);
  expect(renderContent.find(Review).html().includes("Returned review title 1")).toBe(true);
  expect(renderContent.find(Review).html().includes("Returned review title 2")).toBe(true);
});


it("Check banned words should not be allowed", async () => {
  global.window = Object.create(window);
  const url = "https://frontend.fafago-dev.alexgd.es";
  const reviewId = 12345;
  Object.defineProperty(window, 'location', {
    value: {
      location: url,
      pathname: '/reviews/client/' + reviewId
    }
  });

  let renderContent = mount(
    <Provider store={store}>
      <Review />
    </Provider>
  );

  act(() => {
    let scoreInput = renderContent.find({ name: 'customized-empty' }).at(2);
    scoreInput.prop('onChange')({ target: { name: 'customized-empty', value: 4 } });
  });

  let titleInput = renderContent.find({ name: 'title' });
  let descriptionInput = renderContent.find({ name: 'description' });
  let button = renderContent.find({ 'data-testid': 'add' });

  titleInput.prop('onChange')({ target: { name: 'title', value: 'You have been changed - pussy' } });
  descriptionInput.prop('onChange')({ target: { name: 'description', value: 'This is a fantastic review' } });
  button.simulate('click');
  renderContent.find(Review).render();

  //Wait for state change
  await new Promise(resolve => setTimeout(() => resolve(), 500));

  expect(renderContent.find(Review).state().errorInfo).toBe('Your review contains bad words. Please be polite.');
});


it("Should not allow a score lower than 1", async () => {

  global.window = Object.create(window);
  const url = "https://frontend.fafago-dev.alexgd.es";
  const reviewId = 12345;
  Object.defineProperty(window, 'location', {
    value: {
      location: url,
      pathname: '/reviews/client/' + reviewId
    }
  });

  let renderContent = mount(
    <Provider store={store}>
      <Review />
    </Provider>
  );

  act(() => {
    let scoreInput = renderContent.find({ name: 'customized-empty' }).at(2);
    scoreInput.prop('onChange')({ target: { name: 'customized-empty', value: 0 } });
  });


  let titleInput = renderContent.find({ name: 'title' });

  let descriptionInput = renderContent.find({ name: 'description' });
  let button = renderContent.find({ 'data-testid': 'add' });

  titleInput.prop('onChange')({ target: { name: 'title', value: 'You have been changed' } });
  descriptionInput.prop('onChange')({ target: { name: 'description', value: 'This is a fantastic review' } });

  button.simulate('click');

  renderContent.find(Review).render();

  //Wait for state change
  await new Promise(resolve => setTimeout(() => resolve(), 500));

  expect(renderContent.find(Review).state().errorInfo).toBe('Score must be a number between 1 and 5');
});