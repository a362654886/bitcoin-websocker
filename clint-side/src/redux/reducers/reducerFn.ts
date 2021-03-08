import { AuthUser } from "../auth";
import { ClientAction } from "../client";
import { SocketConnectUpdateAction } from "../socketConnection";
import { WebSocketDeleteAction, WebSocketInitialAction, WebSocketOpenAction, WebSocketUpdateKlineAction, WebSocketUpdateOrderAction } from "../socketData";
import {
  SubscriptionAddAction,
  SubscriptionDeleteAction,
} from "../subscription";

interface SimpleKeyValueObject {
  [key: string]: any;
}

type actionBody =
  | ClientAction
  | AuthUser
  | WebSocketInitialAction
  | WebSocketDeleteAction
  | WebSocketUpdateOrderAction
  | WebSocketUpdateKlineAction
  | SubscriptionAddAction
  | SubscriptionDeleteAction
  | WebSocketOpenAction
  | SocketConnectUpdateAction;

export const mapArray = (
  type: string,
  handlers: SimpleKeyValueObject
): string | undefined => {
  for (const key in handlers) {
    if (key == type) {
      return key;
    }
  }
};

export const runHandler = <T>(
  state: T,
  action: actionBody,
  handler: (state: T, action: actionBody) => T
): T => handler(state, action);

export const createReducer = <T>(
  state: T,
  action: actionBody,
  handlers: SimpleKeyValueObject
): T => {
  const key = mapArray(action.type, handlers);
  if (key) {
    return runHandler<T>(state, action, handlers[key]);
  }
  return state;
};
