import {
  $CombinedState,
  CombinedState,
  MiddlewareAPI,
  Store,
} from "@reduxjs/toolkit";
import { Kline } from "./Kline";
import { orderArr } from "./orderType";
import {
  InitAction,
  SubscriptionAddAction,
  SubscriptionDeleteAction,
} from "../src/redux/duck/subscription";

export type StoreType = Store<
  CombinedState<{
    klineData: Map<string, Kline>;
    orderData: Map<string, orderArr>;
    subscription: Map<string, Set<string>>;
  }>,
  actionType
> & { dispatch: unknown };

export type middleStoreType = MiddlewareAPI<
  any,
  { readonly [$CombinedState]?: undefined } & {
    klineData: Map<string, Kline>;
    orderData: Map<string, orderArr>;
    subscription: Map<string, Set<string>>;
  }
> & { dispatch: unknown };

export type actionType =
  | InitAction
  | SubscriptionAddAction
  | SubscriptionDeleteAction

export type nextAction = (action: actionType) => void;
