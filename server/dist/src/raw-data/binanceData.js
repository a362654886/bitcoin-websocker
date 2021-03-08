"use strict";
/*import { formatDate } from "../helpFn";
import WebSocket from "ws";
import { Kline, TimeEnum } from "../../types/Kline";
import { store } from "../app";
import { createAction } from "../redux/createAction";
import { UPDATE_BINANCE } from "../redux/duck/binance";

const newSocket = (time: TimeEnum,cointype: string): WebSocket =>
  new WebSocket(`wss://stream.binance.com:9443/ws/btcusdt@kline_${time}`);

const socketStart = (socket: WebSocket): void => {
  socket.onmessage = (event: any) => {

    const binance_data = dataFormat(JSON.parse(event.data));

    store.dispatch(
      createAction<Kline, UPDATE_BINANCE>(binance_data, UPDATE_BINANCE)
    );

    // middleware to broadcast
  };
};

const dataFormat = (raw_data: any): Kline => {
  const _date = new Date(raw_data.k.t);
  return {
    open_price: raw_data?.k?.o,
    close_price: raw_data?.k?.c,
    high_price: raw_data?.k?.h,
    low_price: raw_data?.k?.l,
    time: formatDate(_date),
  };
};

export const binanceStart = (time: TimeEnum): void =>
  socketStart(newSocket(time,"cointype"));*/
