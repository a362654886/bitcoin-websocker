import { reducer } from "../redux/reducer";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { initialMiddleware } from "./middleware/initialMiddleware";
import { clientWsMiddleware } from "./middleware/clientWsMiddleware";

const middleWares = applyMiddleware(
  thunk,
  clientWsMiddleware,
  initialMiddleware
);

export const newStore = () => createStore(reducer, middleWares);
