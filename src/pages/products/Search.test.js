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

  nock('http://localhost:8080').defaultReplyHeaders({ 'access-control-allow-origin': '*' })
    .get('/api/v1/products/client/asd')
    .reply(200, [{"name": "delete", "price":5, "category": "delete", "seller":"deleteTest"}]);

  nock('http://localhost:8080').defaultReplyHeaders({ 'access-control-allow-origin': '*' })
    .get('/api/v1/rates')
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

  console.log('FIND PRODUCTS: ' + JSON.stringify(renderContent.find(Products).html()));
  renderContent.find(Products).setState(state);

  console.log('RENDER CONTENT: ' + JSON.stringify(renderContent.html()));


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

  console.log('FIND PRODUCTS: ' + JSON.stringify(renderContent.find(Products).html()));
  renderContent.find(Products).setState(state);

  console.log('RENDER CONTENT: ' + JSON.stringify(renderContent.html()));


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

/*it("Should not allow a string in the price field", async () => {
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

  console.log('FIND PRODUCTS: ' + JSON.stringify(renderContent.find(Products).html()));
  renderContent.find(Products).setState(state);

  console.log('RENDER CONTENT: ' + JSON.stringify(renderContent.html()));


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

  console.log('FIND PRODUCTS: ' + JSON.stringify(renderContent.find(Products).html()));
  renderContent.find(Products).setState(state);

  console.log('RENDER CONTENT: ' + JSON.stringify(renderContent.html()));


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