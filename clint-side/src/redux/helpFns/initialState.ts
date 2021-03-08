import { combineReducers } from "redux";
import { login_state } from "../auth";
import { client } from "../client";
import { socketData } from "../socketData";

const initialState = () => {
    
  return combineReducers({
    login_state,
    client,
    socketData,
  });
};
