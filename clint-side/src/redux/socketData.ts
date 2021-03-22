import { createReducer } from "./reducers/reducerFn";
import {
  SocketInitialDataType,
  SocketKlineData,
  SocketOrderData,
  SocketTypeData,
  webSocketData,
} from "../types/socketType";

//TO DO symbol name
export const UPDATE_SOCKET_DATA_KLINE = "UPDATE_SOCKET_DATA_KLINE";
export type UPDATE_SOCKET_DATA_KLINE = typeof UPDATE_SOCKET_DATA_KLINE;

export const UPDATE_SOCKET_DATA_ORDER = "UPDATE_SOCKET_DATA_ORDER";
export type UPDATE_SOCKET_DATA_ORDER = typeof UPDATE_SOCKET_DATA_ORDER;

export const INITIAL_SOCKET_DATA = "INITIAL_SOCKET_DATA";
export type INITIAL_SOCKET_DATA = typeof INITIAL_SOCKET_DATA;

export const DELETE_SOCKET_DATA = "DELETE_SOCKET_DATA";
export type DELETE_SOCKET_DATA = typeof DELETE_SOCKET_DATA;

export const OPEN_SOCKET_DATA = "OPEN_SOCKET_DATA";
export type OPEN_SOCKET_DATA = typeof OPEN_SOCKET_DATA;

export interface WebSocketUpdateKlineAction {
  payload: SocketKlineData;
  type: typeof UPDATE_SOCKET_DATA_KLINE;
}

export interface WebSocketUpdateOrderAction {
  payload: SocketOrderData;
  type: typeof UPDATE_SOCKET_DATA_ORDER;
}

export interface WebSocketInitialAction {
  payload: SocketInitialDataType;
  type: typeof INITIAL_SOCKET_DATA;
}

export interface WebSocketDeleteAction {
  payload: string;
  type: typeof DELETE_SOCKET_DATA;
}

export interface WebSocketOpenAction {
  payload: SocketInitialDataType;
  type: typeof OPEN_SOCKET_DATA;
}

export const handlers = {
  UPDATE_SOCKET_DATA_KLINE: (
    state: Map<string, webSocketData>,
    action: WebSocketUpdateKlineAction
  ): Map<string, webSocketData> => {
    const typeExist = state.has(action.payload.type);
    if (typeExist) {
      const mapArr = state.get(action.payload.type) as webSocketData;
      const end = mapArr.klineData[mapArr.klineData.length - 1];
      if (end.time == action.payload.data.time) {
        mapArr.klineData[mapArr.klineData.length - 1] = action.payload.data;
      } else {
        mapArr.klineData.push(action.payload.data);
      }
    } else {
      state.set(action.payload.type, {
        klineData: [action.payload.data],
        orderData: {
          bid: [],
          ask: [],
        },
      });
    }
    const newState = new Map<string, webSocketData>(state);
    return newState;
  },
  UPDATE_SOCKET_DATA_ORDER: (
    state: Map<string, webSocketData>,
    action: WebSocketUpdateOrderAction
  ): Map<string, webSocketData> => {
    const typeExist = state.has(action.payload.type);
    if (typeExist) {
      const mapArr = state.get(action.payload.type) as webSocketData;
      mapArr.orderData = action.payload.data;
    } else {
      state.set(action.payload.type, {
        klineData: [],
        orderData: action.payload.data,
      });
    }
    const newState = new Map<string, webSocketData>(state);
    return newState;
  },
  INITIAL_SOCKET_DATA: (
    state: Map<string, webSocketData>,
    action: WebSocketInitialAction
  ): Map<string, webSocketData> => {
    const type = `${action.payload.exchange}${action.payload.symbol}${action.payload.time}`;
    state.set(type, action.payload.data);
    return state;
  },
  OPEN_SOCKET_DATA: (
    state: Map<string, webSocketData>,
    action: WebSocketInitialAction
  ): Map<string, webSocketData> => {
    const type = `${action.payload.exchange}${action.payload.symbol}${action.payload.time}`;
    state.set(type, action.payload.data);
    return state;
  },
  DELETE_SOCKET_DATA: (
    state: Map<string, webSocketData>,
    action: WebSocketDeleteAction
  ): Map<string, webSocketData> => {
    state.delete(action.payload);
    const newState = new Map<string, webSocketData>(state);
    return newState;
  },
};
export const socketData = (
  state: Map<string, webSocketData> = new Map<string, webSocketData>(),
  action:
    | WebSocketInitialAction
    | WebSocketDeleteAction
    | WebSocketUpdateOrderAction
    | WebSocketUpdateKlineAction
    | WebSocketOpenAction
): Map<string, webSocketData> =>
  createReducer<Map<string, webSocketData>>(state, action, handlers);
