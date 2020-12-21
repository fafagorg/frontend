import { render, screen } from "@testing-library/react";
import Messenger from "./Messenger";

test("renders learn react link", () => {
  render(<Messenger />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
