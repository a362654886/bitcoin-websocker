import { getBinanceHistory } from "../../api/dataApi";
import { getToken } from "../../helpFn/tokenFn";
import {
  actionType,
  middleStoreType,
  nextAction,
} from "../../types/defaultType";
import {
  ExchangeEnum,
  Kline,
  SymbolEnum,
  TimeEnum,
  webSocketData,
} from "../../types/socketType";
import { AUTH_USER_SUCCESS } from "../auth";
import {
  DELETE_SOCKET_DATA,
  INITIAL_SOCKET_DATA,
  OPEN_SOCKET_DATA,
  UPDATE_SOCKET_DATA_KLINE,
  UPDATE_SOCKET_DATA_ORDER,
} from "../socketData";
import { SocketKlineData, SocketOrderData } from "../../types/socketType";
import { SUBSCRIPTION_ADD, SUBSCRIPTION_DELETE } from "../subscription";
import { transferStringToObj } from "../../helpFn/transferStringToObj";
import { getLineData } from "../../helpFn/math";
import { UPDATE_SOCKET_CONNECT_DATA } from "../socketConnection";

type socketState ={
  socket:WebSocket|null
}

export const socketState: socketState = {
  socket:null
}

export const websocketMiddleWare = (store: middleStoreType) => (
  next: nextAction
) => async (action: actionType): Promise<void> => {
  next(action);
  const token = getToken();
  //initial websocket
  if (action.type == OPEN_SOCKET_DATA) {
    //initial websocket
    socketState.socket = new WebSocket(
      `ws://localhost:8080/ws?clientId=${token}&exchange=BINANCE&symbol=bnbbtc&time=1m`
    );
    const ws: WebSocket = socketState.socket as WebSocket;
    // build a initialize event
    ws.onmessage = function (event) {
      const data = JSON.parse(event.data);
      
      if (data.kline) {
        data.kline.close_price = parseFloat(data.kline.close_price);
        data.kline.high_price = parseFloat(data.kline.high_price);
        data.kline.low_price = parseFloat(data.kline.low_price);
        data.kline.open_price = parseFloat(data.kline.open_price);
        data.kline.volume = parseFloat(data.kline.volume);
        const socketKlineData: SocketKlineData = {
          type: data.type,
          data: data.kline,
        };
        store.dispatch({
          payload: socketKlineData,
          type: UPDATE_SOCKET_DATA_KLINE,
        });
      }

      if (data.order) {
        const socketOrderData: SocketOrderData = {
          type: data.type,
          data: data.order,
        };
        //console.log(socketOrderData)
        store.dispatch({
          payload: socketOrderData,
          type: UPDATE_SOCKET_DATA_ORDER,
        });
      }

      //add connecttion
      store.dispatch({
        payload: new Date(),
        type: UPDATE_SOCKET_CONNECT_DATA,
      });
    };

    setTimeout(() => {
      //initial others
      //btcusdt
      store.dispatch({
        data: {
          type: `${ExchangeEnum.BINANCE}${SymbolEnum.BTCUSDT}${TimeEnum.oneMin}`,
          subscription: {
            exchange: ExchangeEnum.BINANCE,
            symbol: SymbolEnum.BTCUSDT,
            time: TimeEnum.oneMin,
          },
        },
        type: SUBSCRIPTION_ADD,
      });
      //bnbbusd
      store.dispatch({
        data: {
          type: `${ExchangeEnum.BINANCE}${SymbolEnum.BNBBUSD}${TimeEnum.oneMin}`,
          subscription: {
            exchange: ExchangeEnum.BINANCE,
            symbol: SymbolEnum.BNBBUSD,
            time: TimeEnum.oneMin,
          },
        },
        type: SUBSCRIPTION_ADD,
      });
      //ethbusd
      store.dispatch({
        data: {
          type: `${ExchangeEnum.BINANCE}${SymbolEnum.ETHBUSD}${TimeEnum.oneMin}`,
          subscription: {
            exchange: ExchangeEnum.BINANCE,
            symbol: SymbolEnum.ETHBUSD,
            time: TimeEnum.oneMin,
          },
        },
        type: SUBSCRIPTION_ADD,
      });
    },1000);
  }
  //client update
  if (action.type == SUBSCRIPTION_ADD) {
    const ws: WebSocket = socketState.socket as WebSocket;
    //initial history data
    //initial history data
    const historyData = await getHistoryData(
      action.data.subscription.exchange,
      action.data.subscription.symbol,
      action.data.subscription.time
    );
    store.dispatch({
      payload: {
        exchange: action.data.subscription.exchange,
        symbol: action.data.subscription.symbol,
        time: action.data.subscription.time,
        data: historyData,
      },
      type: INITIAL_SOCKET_DATA,
    });
    //update kline data
    ws.send(
      `{ "exchange":"${action.data.subscription.exchange}", "symbol":"${action.data.subscription.symbol}", "time":"${action.data.subscription.time}","type":"update"}`
    );
  }

  if (action.type == SUBSCRIPTION_DELETE) {
    const ws: WebSocket = socketState.socket as WebSocket;
    store.dispatch({
      payload: action.data,
      type: DELETE_SOCKET_DATA,
    });
    //update kline data
    const obj = transferStringToObj(action.data);
    ws.send(
      `{ "exchange":"${obj.exchange}", "symbol":"${obj.symbol}", "time":"${obj.time}","type":"delete"}`
    );
  }
};

const getHistoryData = async (
  exchange: ExchangeEnum,
  symbol: SymbolEnum,
  time: TimeEnum
): Promise<webSocketData> => {
  //get result array
  const endTimeNum = new Date().setDate(new Date().getDate() - 11);
  const startTimeNum = new Date().setDate(new Date().getDate() - 1);
  const endTime = new Date(endTimeNum);
  const startTime = new Date(startTimeNum);
  const historyData = await getBinanceHistory(
    symbol,
    time,
    `${endTime.getFullYear()}-${endTime.getMonth() + 1}-${endTime.getDate()}`,
    `${startTime.getFullYear()}-${
      startTime.getMonth() + 1
    }-${startTime.getDate()}`
  );
  //format array
  const lastTen = historyData?.slice(
    historyData.length - 99,
    historyData.length
  );
  const klineArr: Kline[] = [];
  lastTen?.forEach((e) => {
    const kline: Kline = {
      open_price: parseFloat(e.open),
      close_price: parseFloat(e.close),
      high_price: parseFloat(e.high),
      low_price: parseFloat(e.low),
      volume: parseFloat(e.volume),
      time: e.time,
    };
    klineArr.push(kline);
  });
  return {
    klineData: klineArr,
    orderData: {
      bid: [],
      ask: [],
    },
  };
};

export const initialFn = async (
  exchange: ExchangeEnum,
  symbol: SymbolEnum,
  time: TimeEnum
) => {
  const data = await getHistoryData(exchange, symbol, time);
  return {
    payload: {
      exchange: exchange,
      symbol: symbol,
      time: time,
      data: data,
    },
  };
};
