import Search from "./Search";
import NewProduct from '../../components/product/newProduct';
import { Products } from '../../components/product/clientProducts';
import Alert from '../../components/product/Alert';
import { unmountComponentAtNode, render as reactRender } from 'react-dom';
import { act } from 'react-dom/test-utils';
import { configure, mount, shallow, render } from "enzyme";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import nock from 'nock';

import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import products from "../../components/product/products";

configure({ adapter: new Adapter() })

const mockStore = configureMockStore();

let state = { token: '1234', username: 'test', currentUser: 'test' };
// const store = mockStore(() => state);
// this.state.token && this.state.username === this.state.currentUser
const store = mockStore();

let container = document.createElement("div");
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);

  nock('http://localhost:8080').defaultReplyHeaders({ 'access-control-allow-origin': '*', 'access-control-allow-headers': 'Authorization' })
    .post('/api/v1/products').times(100)
    .reply(200, []);

  nock('http://localhost:8080').defaultReplyHeaders({ 'access-control-allow-origin': '*', 'access-control-allow-headers': 'Authorization' })
    .options('/api/v1/products').times(100)
    .reply(200, {});


  nock('http://localhost:8080').defaultReplyHeaders({ 'access-control-allow-origin': '*' })
    .get('/api/v1/products').times(100)
    .reply(200, []);
    
  nock('http://localhost:8080').defaultReplyHeaders({ 'access-control-allow-origin': '*' })
  .get('/api/v1/products/client/RandomUser').times(100)
  .reply(200, [{ "name": "This is a fantastic product for a test.", "price": 5, "category": "delete", "seller": "deleteTest" }]);

  nock('http://localhost:8080').defaultReplyHeaders({ 'access-control-allow-origin': '*' })
    .get('/api/v1/rates').times(100)
    .reply(200, []);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

// it("Should render the message of the alert", () => {
//   act(() => {
//     reactRender(<Alert message="Test" onCloseCallback={jest.fn()} />, container);

//   });
//   expect(container.hasChildNodes()).toBe(true);
//   expect(container.textContent).toEqual(expect.stringContaining("Test"));
// });

// it("Does not render if message is null", () => {
//   act(() => {
//     reactRender(<Alert message={null} onCloseCallback={jest.fn()} />, container);
//   });
//   expect(container.hasChildNodes()).toBe(false);
// });

// it("Sends event if button is clicked", () => {
//   const onClose = jest.fn();
//   act(() => {
//     reactRender(<Alert message="test" onClose={onClose} />, container);
//   });

//   const button = document.querySelector("[data-testid=close]");

//   act(() => {
//     button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
//   });

//   expect(onClose).toHaveBeenCalledTimes(1);
// });

// it("Should render the new product component", () => {
//   act(() => {
//     reactRender(<NewProduct onAddProduct={jest.fn()} />, container);

//   });
//   expect(container.hasChildNodes()).toBe(true);
// });

// it("Sends event if add product button is clicked", () => {
//   const onClick = jest.fn();
//   act(() => {
//     render(<NewProduct onAddProduct={onClick} />, container);
//   });

//   const button = document.querySelector("[data-testid=add]");

//   act(() => {
//     button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
//   });

//   expect(onClick).toHaveBeenCalledTimes(1);
// });

it("Should not allow a string in the price field", async () => {
  global.window = Object.create(window);
  const url = "https://frontend.fafago-dev.alexgd.es";
  const username = 'RandomUser'
  Object.defineProperty(window, 'location', {
    value: {
      location: url,
      pathname: '/product_client',
      search: '?username=' + username,
      reload: function () { }
    }
  });

  let renderContent = mount(
    <Provider store={store}>
      <Products />
    </Provider>
  );

  renderContent.find(Products).setState(state);

  let titleInput = renderContent.find({ name: 'name' });
  let priceInput = renderContent.find({ name: 'price' });
  let button = renderContent.find({ 'data-testid': 'add' });

  priceInput.prop('onChange')({ target: { name: 'price', value: 'string' } });

  button.simulate('click');
  renderContent.find(Products).render();

  //Wait for state change
  await new Promise(resolve => setTimeout(() => resolve(), 500));

  expect(renderContent.find(Products).state().errorInfo).toBe('Price must be a number');
});


it("Should not allow a value lower than 1 in the price", async () => {
  global.window = Object.create(window);
  const url = "https://frontend.fafago-dev.alexgd.es";
  const username = 'RandomUser'
  Object.defineProperty(window, 'location', {
    value: {
      location: url,
      pathname: '/product_client',
      search: '?username=' + username,
      reload: function () { }
    }
  });

  let renderContent = mount(
    <Provider store={store}>
      <Products />
    </Provider>
  );

  renderContent.find(Products).setState(state);
  let titleInput = renderContent.find({ name: 'name' });
  let priceInput = renderContent.find({ name: 'price' });
  let button = renderContent.find({ 'data-testid': 'add' });

  priceInput.prop('onChange')({ target: { name: 'price', value: 0 } });

  button.simulate('click');
  renderContent.find(Products).render();

  //Wait for state change
  await new Promise(resolve => setTimeout(() => resolve(), 500));

  expect(renderContent.find(Products).state().errorInfo).toBe('Price can not be lower than 1');
});


it("Should not allow to use a banned word in the name", async () => {
  global.window = Object.create(window);
  const url = "https://frontend.fafago-dev.alexgd.es/";
  const username = 'RandomUser'
  Object.defineProperty(window, 'location', {
    value: {
      location: url,
      pathname: '/product_client',
      search: '?username=' + username
    }
  });

  let renderContent = mount(
    <Provider store={store}>
      <Products />
    </Provider>
  );

  renderContent.find(Products).setState(state);

  let titleInput = renderContent.find({ name: 'name' });
  let priceInput = renderContent.find({ name: 'price' });
  let categoryInput = renderContent.find({ name: 'category' });
  let button = renderContent.find({ 'data-testid': 'add' });

  titleInput.prop('onChange')({ target: { name: 'name', value: "spam" } });
  priceInput.prop('onChange')({ target: { name: 'price', value: 2 } });
  categoryInput.prop('onChange')({ target: { name: 'category', value: 'CategoryTest' } });


  button.simulate('click');
  renderContent.find(Products).render();

  //Wait for state change
  await new Promise(resolve => setTimeout(() => resolve(), 500));

  expect(renderContent.find(Products).state().errorInfo).toBe('Banned word used in name or category');
});


it("Category should not be empty", async () => {
  global.window = Object.create(window);
  const url = "https://frontend.fafago-dev.alexgd.es/";
  const username = 'RandomUser'
  Object.defineProperty(window, 'location', {
    value: {
      location: url,
      pathname: '/product_client',
      search: '?username=' + username
    }
  });

  let renderContent = mount(
    <Provider store={store}>
      <Products />
    </Provider>
  );

  renderContent.find(Products).setState(state);

  let titleInput = renderContent.find({ name: 'name' });
  let priceInput = renderContent.find({ name: 'price' });
  let categoryInput = renderContent.find({ name: 'category' });
  let button = renderContent.find({ 'data-testid': 'add' });

  titleInput.prop('onChange')({ target: { name: 'name', value: "A nice product" } });
  priceInput.prop('onChange')({ target: { name: 'price', value: 2 } });
  categoryInput.prop('onChange')({ target: { name: 'category', value: '' } });


  button.simulate('click');
  renderContent.find(Products).render();

  //Wait for state change
  await new Promise(resolve => setTimeout(() => resolve(), 500));

  expect(renderContent.find(Products).state().errorInfo).toBe('Category can not be empty');
});


it("Product creation should not return errors", async () => {
  global.window = Object.create(window);
  const url = "https://frontend.fafago-dev.alexgd.es/";
  const username = 'RandomUser'
  Object.defineProperty(window, 'location', {
    value: {
      location: url,
      pathname: '/product_client',
      search: '?username=' + username
    }
  });

  let renderContent = mount(
    <Provider store={store}>
      <Products />
    </Provider>
  );

  renderContent.find(Products).setState(state);

  let titleInput = renderContent.find({ name: 'name' });
  let priceInput = renderContent.find({ name: 'price' });
  let categoryInput = renderContent.find({ name: 'category' });
  let button = renderContent.find({ 'data-testid': 'add' });

  titleInput.prop('onChange')({ target: { name: 'name', value: "A nice product" } });
  priceInput.prop('onChange')({ target: { name: 'price', value: 2 } });
  categoryInput.prop('onChange')({ target: { name: 'category', value: 'NiceCategory' } });


  button.simulate('click');
  renderContent.find(Products).render();

  //Wait for state change
  await new Promise(resolve => setTimeout(() => resolve(), 500));

  expect(renderContent.find(Products).state().errorInfo).toBe(null);
});



it("Category should not have banned words", async () => {
  global.window = Object.create(window);
  const url = "https://frontend.fafago-dev.alexgd.es/";
  const username = 'RandomUser'
  Object.defineProperty(window, 'location', {
    value: {
      location: url,
      pathname: '/product_client',
      search: '?username=' + username
    }
  });

  let renderContent = mount(
    <Provider store={store}>
      <Products />
    </Provider>
  );

  renderContent.find(Products).setState(state);

  let titleInput = renderContent.find({ name: 'name' });
  let priceInput = renderContent.find({ name: 'price' });
  let categoryInput = renderContent.find({ name: 'category' });
  let button = renderContent.find({ 'data-testid': 'add' });

  titleInput.prop('onChange')({ target: { name: 'name', value: "A nice product" } });
  priceInput.prop('onChange')({ target: { name: 'price', value: 2 } });
  categoryInput.prop('onChange')({ target: { name: 'category', value: 'spam' } });

  button.simulate('click');
  renderContent.find(Products).render();

  //Wait for state change
  await new Promise(resolve => setTimeout(() => resolve(), 500));

  expect(renderContent.find(Products).state().errorInfo).toBe('Banned word used in name or category');
});



it("User RandomUser should have 1 product and should be listed", async () => {
  global.window = Object.create(window);
  const url = "https://frontend.fafago-dev.alexgd.es/";
  const username = 'RandomUser';
  Object.defineProperty(window, 'location', {
    value: {
      location: url,
      pathname: '/product_client',
      search: '?username=' + username
    }
  });

  let renderContent = mount(
    <Provider store={store}>
      <Products />
    </Provider>
  );

  //Wait for state change
  await new Promise(resolve => setTimeout(() => resolve(), 500));

  expect(renderContent.find(Products).state().errorInfo).toBe(null);
  expect(renderContent.find(Products).html().includes("This is a fantastic product for a test.")).toBe(true);
});






/*it("Should not allow a string in the price field", async () => {
  global.window = Object.create(window);
  const url = "https://frontend.fafago-dev.alexgd.es";
  const username = 'RandomUser'
  Object.defineProperty(window, 'location', {
    value: {
      location: url,
      pathname: '/product_client',
      search: '?username=' + username
    }
  });

  let renderContent = mount(
    <Provider store={store}>
      <Products />
    </Provider>
  );


  renderContent.find(Products).setState(state);




  let titleInput = renderContent.find({ name: 'name' });
  let priceInput = renderContent.find({ name: 'price' });
  let button = renderContent.find({ 'data-testid': 'add' });

  priceInput.prop('onChange')({ target: { name: 'price', value: 0 } });



  button.simulate('click');
  renderContent.find(Products).render();

  //Wait for state change
  await new Promise(resolve => setTimeout(() => resolve(), 500));

  expect(renderContent.find(Products).state().errorInfo).toBe('Price can not be lower than 1');
});

it("Should not allow a string in the price field", async () => {
  global.window = Object.create(window);
  const url = "https://frontend.fafago-dev.alexgd.es";
  const username = 'asd';
  Object.defineProperty(window, 'location', {
    value: {
      location: url,
      pathname: '/product_client',
      search: '?username=' + username
    }
  });

  let renderContent = mount(
    <Provider store={store}>
      <Products />
    </Provider>
  );


  renderContent.find(Products).setState(state);




  let titleInput = renderContent.find({ name: 'name' });
  let priceInput = renderContent.find({ name: 'price' });
  let button = renderContent.find({ 'data-testid': 'add' });

  priceInput.prop('onChange')({ target: { name: 'price', value: 0 } });



  button.simulate('click');
  renderContent.find(Products).render();

  //Wait for state change
  await new Promise(resolve => setTimeout(() => resolve(), 500));

  expect(renderContent.find(Products).state().errorInfo).toBe('Price can not be 0');
});*/