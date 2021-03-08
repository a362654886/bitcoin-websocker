import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { Provider } from "react-redux";
import storage from "redux-persist/lib/storage";
import { Persistor, persistReducer, persistStore } from "redux-persist";
import { createStore, applyMiddleware } from "redux";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import PrivateRoute from "./router/privateRoute";
import LoginPage from "./container/loginPage";
import reducer from "./redux/reducers";
import thunk from "redux-thunk";
import MainPage from "./container/mainPage";
import "antd/dist/antd.css";
import { websocketMiddleWare } from "./redux/middleWares/websocketMiddleWare";

const persistConfig = {
  key: "root",
  storage: storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);
const store: any = createStore(reducer,applyMiddleware(thunk,websocketMiddleWare));
const persistor : Persistor = persistStore(store)
console.log(store.getState())

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/login" component={LoginPage} exact />
        <PrivateRoute component={MainPage} path="/main_page" />
        <Redirect to="/login" />
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
