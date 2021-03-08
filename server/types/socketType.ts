import WebSocket from "ws";
import { ExchangeEnum, SymbolEnum, TimeEnum } from "./enumType";
import { Kline } from "./Kline";
import { orderArr, OrderBody } from "./orderType";

export type SocketType = {
  serverType: string;
  coinType: ExchangeEnum;
  timer: TimeEnum;
  socket: WebSocket;
  coinHouse: SymbolEnum;
};

export type SocketData = {
  kline: Kline | undefined;
  order: orderArr | undefined;
};

export type WebSocketObj = (
  TimeEnum,
  SymbolEnum
) => {
  serverType: string;
  socket: WebSocket;
};

export type WebSocketOrderObj = (
  any,
  SymbolEnum,
  TimeEnum,
) => OrderBody | null;

export type WebSocketOrderObjPromise = (
  any,
  SymbolEnum,
  TimeEnum,
) => Promise<OrderBody | null>;
