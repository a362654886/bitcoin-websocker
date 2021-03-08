import { createReducer } from "./reducers/reducerFn";
import {
  Subscription,
  SubscriptionObj,
} from "../types/socketType";

//actions

export const SUBSCRIPTION_ADD = "SUBSCRIPTION_ADD";
export type SUBSCRIPTION_ADD = typeof SUBSCRIPTION_ADD;

export const SUBSCRIPTION_DELETE = "SUBSCRIPTION_DELETE";
export type SUBSCRIPTION_DELETE = typeof SUBSCRIPTION_DELETE;

//action type
export interface SubscriptionAddAction {
  data: SubscriptionObj;
  type: typeof SUBSCRIPTION_ADD;
}

export interface SubscriptionDeleteAction {
  data: string;
  type: typeof SUBSCRIPTION_DELETE;
}

//reducer
const handlers = {
  SUBSCRIPTION_ADD: (
    state: Map<string, Subscription>,
    action: SubscriptionAddAction
  ) => {
    const type = `${action.data.subscription.exchange}${action.data.subscription.symbol}${action.data.subscription.time}`;
    const typeExist = state.has(type);
    if (!typeExist) {
      state.set(type, action.data.subscription);
    }
    return state;
  },
  SUBSCRIPTION_DELETE: (
    state: Map<string, Subscription>,
    action: SubscriptionDeleteAction
  ) => {
    state.delete(action.data);
    const newState = new Map<string, Subscription>(state);
    return newState;
  },
};
export const subscription = (
  state: Map<string, Subscription> = new Map<string, Subscription>(),
  action: SubscriptionAddAction | SubscriptionDeleteAction
): Map<string, Subscription> => createReducer<Map<string, Subscription>>(state, action, handlers);
