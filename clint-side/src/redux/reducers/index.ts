import { combineReducers } from "redux";
import {login_state} from "../auth"
import {client} from "../client"
import {socketData} from "../socketData"
import {socketConnection} from "../socketConnection"
import {subscription} from "../subscription"

export default combineReducers({
    // state remove
    login_state,
    client,
    socketData,
    subscription,
    socketConnection
});