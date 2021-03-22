import { createReducer } from "../createReducer";
import {
  SubscriptionType,
} from "../../../types/subscriptionType";

export const ADD_SUBSCRIPTION = "ADD_SUBSCRIPTION";
export type ADD_SUBSCRIPTION = typeof ADD_SUBSCRIPTION;

export const DELETE_SUBSCRIPTION = "DELETE_SUBSCRIPTION";
export type DELETE_SUBSCRIPTION = typeof DELETE_SUBSCRIPTION;

export const INIT = "@@redux/INIT";
export type INIT = typeof INIT;

export interface InitAction {
  payload: string;
  type: typeof INIT;
}

export interface SubscriptionAddAction {
  payload: SubscriptionType;
  type: typeof ADD_SUBSCRIPTION;
}

export interface SubscriptionDeleteAction {
  payload: SubscriptionType;
  type: typeof DELETE_SUBSCRIPTION;
}

export const handlers = {
  ADD_SUBSCRIPTION: (
    state: Map<string, Set<string>>,
    action: SubscriptionAddAction
  ):  Map<string, Set<string>> => {
    const key = `${action.payload.subscriptionType.exchange}${action.payload.subscriptionType.symbol}${action.payload.subscriptionType.time}`;
    //if map have this key
    const typeExist = state.has(key);
    // add clientId
    if (typeExist) {
      const mapSet = state.get(key) as Set<string>;
      mapSet.add(action.payload.clientId);
    } else {
      const newSet = new Set<string>();
      newSet.add(action.payload.clientId);
      state.set(key, newSet);
    }
    const newState = new Map<string, Set<string>>(state);
    return newState;
  },
  DELETE_SUBSCRIPTION: (
    state: Map<string, Set<string>>,
    action: SubscriptionDeleteAction
  ):  Map<string, Set<string>> => {
    const key = `${action.payload.subscriptionType.exchange}${action.payload.subscriptionType.symbol}${action.payload.subscriptionType.time}`;
    const set = state.get(key);
    set?.delete(action.payload.clientId);
    const newState = new Map<string, Set<string>>(state);
    return newState;
  },
};
export const subscription = (
  state: Map<string, Set<string>> = new Map<string, Set<string>>(),
  action:
    | SubscriptionAddAction
    | SubscriptionDeleteAction
    | InitAction
): Map<string, Set<string>> =>
  createReducer<Map<string, Set<string>>>(state, action, handlers);
