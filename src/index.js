import React from "react";
import ReactDOM from "react-dom";
import "./index.js";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "fontsource-roboto";
import {createBrowserHistory} from "history";
import {HistoryContext} from './components/navigation/history'

const customHistory = createBrowserHistory();


ReactDOM.render(
  <HistoryContext.Provider value={customHistory}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </HistoryContext.Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
