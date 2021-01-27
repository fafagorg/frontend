import Search from "./Search";
import NewProduct from '../../components/product/newProduct';
import Alert from '../../components/product/Alert';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';

let container = document.createElement("div");
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("Should render the message of the alert", () => {
  act(() => {
    render(<Alert message="Test" onCloseCallback={jest.fn()} />, container);

  });
  expect(container.hasChildNodes()).toBe(true);
  expect(container.textContent).toEqual(expect.stringContaining("Test"));
});

it("Does not render if message is null", () => {
  act(() => {
    render(<Alert message={null} onCloseCallback={jest.fn()} />, container);
  });
  expect(container.hasChildNodes()).toBe(false);
});

it("Sends event if button is clicked", () => {
  const onClose = jest.fn();
  act(() => {
    render(<Alert message="test" onClose={onClose} />, container);
  });

  const button = document.querySelector("[data-testid=close]");

  act(() => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  expect(onClose).toHaveBeenCalledTimes(1);
});

it("Should render the new product component", () => {
  act(() => {
    render(<NewProduct onAddProduct={jest.fn()} />, container);

  });
  expect(container.hasChildNodes()).toBe(true);
});

it("Sends event if add product button is clicked", () => {
  const onClick = jest.fn();
  act(() => {
    render(<NewProduct onAddProduct={onClick} />, container);
  });

  const button = document.querySelector("[data-testid=add]");

  act(() => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  expect(onClick).toHaveBeenCalledTimes(1);
});
