import {
  $CombinedState,
  CombinedState,
  MiddlewareAPI,
  Store,
} from "@reduxjs/toolkit";
import { AuthUser } from "../redux/auth";
import { ClientAction } from "../redux/client";
import {
  WebSocketDeleteAction,
  WebSocketInitialAction,
  WebSocketOpenAction,
  WebSocketUpdateKlineAction,
  WebSocketUpdateOrderAction,
} from "../redux/socketData";
import {
  SubscriptionAddAction,
  SubscriptionDeleteAction,
} from "../redux/subscription";
import { LoginType } from "./auth-type";
import { Client, Subscription, webSocketData } from "./socketType";

export interface action_Type {
  [x: string]: string | webSocketData;
  type: string;
}

export type StoreType = Store<
  CombinedState<{
    login_state: LoginType;
    client: Client;
    socketData: Map<string, webSocketData[]>;
    subscription: Map<string, Subscription>;
  }>,
  action_Type
> & { dispatch: unknown };

export type middleStoreType = MiddlewareAPI<
  any,
  { readonly [$CombinedState]?: undefined } & {
    login_state: LoginType;
    client: Client;
    socketData: Map<string, webSocketData>;
    subscription: Map<string, Subscription>;
  }
> & { dispatch: unknown };

export type actionType =
  | AuthUser
  | WebSocketUpdateOrderAction
  | WebSocketUpdateKlineAction
  | ClientAction
  | WebSocketInitialAction
  | WebSocketDeleteAction
  | SubscriptionAddAction
  | SubscriptionDeleteAction
  | WebSocketOpenAction;

export type nextAction = (action: actionType) => void;
