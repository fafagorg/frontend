import React from "react";
import ReactDOM from "react-dom";
import "./index.js";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "fontsource-roboto";

// Redux
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from './reducers/reducer';
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

// Router
import { createBrowserHistory } from "history";
import { HistoryContext } from './components/navigation/history'
const customHistory = createBrowserHistory();

const persistConfig = {
  key: 'root',
  storage,
}
 
const persistedReducer = persistReducer(persistConfig, reducer);
let store = createStore(persistedReducer);
let persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <HistoryContext.Provider value={customHistory}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </HistoryContext.Provider>
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
