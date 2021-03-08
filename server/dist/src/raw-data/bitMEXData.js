"use strict";
/*import { store } from "../app";
import { createAction } from "../redux/createAction";
import { UPDATE_BITMEX } from "../redux/duck/bitMEX";
import WebSocket from "ws";
import { Kline, TimeEnum } from "../../types/type";

const newSocket = (time: TimeEnum): WebSocket =>
  new WebSocket(`wss://www.bitmex.com/realtime?subscribe=tradeBin${time}`);

const socketStart = (socket: WebSocket): void => {
  socket.onmessage = (event: any) => {
    const _data = JSON.parse(event.data);
    if (_data.data) {
      store.dispatch(
        createAction<Kline, UPDATE_BITMEX>(dataFormat(_data), UPDATE_BITMEX)
      );
    }
  };
};

const dataFormat = (raw_data: any): Kline => {
  const _data = raw_data?.data[0];
  if (_data.symbol == "XBTUSD") {
    return {
      open_price: _data.open,
      close_price: _data.close,
      high_price: _data.high,
      low_price: _data.low,
      time: _data.timestamp,
    };
  } else {
    return {
      open_price: 0,
      close_price: 0,
      high_price: 0,
      low_price: 0,
      time: "",
    };
  }
};

export const bitMEXStart = (time: TimeEnum): void =>
  socketStart(newSocket(time));*/
