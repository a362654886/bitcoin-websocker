import { createReducer } from "./reducers/reducerFn";
import { Client, ExchangeEnum, SymbolEnum, TimeEnum } from "../types/socketType";

//actions

export const CLIENT_INI = "CLIENT_INI";
export type CLIENT_INI = typeof CLIENT_INI;

export const CLIENT_UPDATE = "CLIENT_UPDATE";
export type CLIENT_UPDATE = typeof CLIENT_UPDATE;

export const CLIENT_DELETE = "CLIENT_DELETE";
export type CLIENT_DELETE = typeof CLIENT_DELETE;

export type clientType = CLIENT_INI | CLIENT_UPDATE | CLIENT_DELETE;

//action type
export interface ClientIniAction {
  data: Client;
  type: typeof CLIENT_INI;
}

export interface ClientUpdateAction {
  data: Client;
  type: typeof CLIENT_UPDATE;
}

export interface ClientDeleteAction {
  data: Client;
  type: typeof CLIENT_DELETE;
}

export type ClientAction =
  | ClientIniAction
  | ClientUpdateAction
  | ClientDeleteAction;

//reducer
const handlers = {
  CLIENT_INI: (state: Client, action: ClientAction) => action.data,
  CLIENT_DELETE: (state: Client, action: ClientAction) => undefined,
  CLIENT_UPDATE: (state: Client, action: ClientAction) => action.data,
};
export const client = (
  state: Client = {
    clientId: "",
    exchange: ExchangeEnum.BINANCE,
    time: TimeEnum.oneMin,
    symbol: SymbolEnum.BTCUSDT
  },
  action: ClientAction
): Client => createReducer<Client>(state, action, handlers);

