import { ExchangeEnum, SymbolEnum, TimeEnum } from "../../types/enumType";
import { newKlineWebSocketMap } from "./KlineSocket";
import { WebSocketObj } from "../../types/socketType";
import { getKlineData } from "../helper/klineDataFormat";
import { Kline } from "../../types/Kline";
import { OrderBody } from "../../types/orderType";
import WebSocket from "ws";
import { orderFormatFns } from "../helper/orderDataFormat";
import { newOrderWebSocketMap } from "./orderSocket";

export type serviceKlineFns<T> = {
  add: (Fn: (kline: Kline) => T, clientId: string, type: string) => void;
  delete: (clientId: string, type: string) => void;
};

export type serviceOrderFns<T> = {
  add: (Fn: (order: OrderBody) => T, clientId: string, type: string) => void;
  delete: (clientId: string, type: string) => void;
};

type KlineFn = {
  clientId: string;
  sendFn: (kline: Kline) => any;
};

type OrderFn = {
  clientId: string;
  sendFn: (order: OrderBody) => any;
};
//save socket
export const serverKlineWebSockets = new Map<string, WebSocket>();
export const serverOrderWebSockets = new Map<string, WebSocket>();
//save functions which socket need to run
const klineFnMap = new Map<string, Set<KlineFn>>(); //save all clientIds
const orderFnMap = new Map<string, Set<OrderFn>>(); //save all clientIds

export const getService = async <T>(
  exchange: ExchangeEnum,
  symbol: SymbolEnum,
  time: TimeEnum
): Promise<{ kline: serviceKlineFns<T>; order: serviceOrderFns<T> }> => {
  const klinService = KlineService<T>(exchange, symbol, time);
  const orderService = await OrderService<T>(exchange, symbol, time);
  return {
    kline: klinService,
    order: orderService,
  };
};

export const KlineService = <T>(
  exchange: ExchangeEnum,
  symbol: SymbolEnum,
  time: TimeEnum
): serviceKlineFns<T> => {
  KlineSocketExist(exchange, symbol, time);

  const addSubscription = (
    Fn: (kline: Kline) => T,
    clientId: string,
    type: string
  ) => {
    const fnType = klineFnMap.get(type);
    fnType?.add({
      clientId: clientId,
      sendFn: Fn,
    });
  };


  const deleteSubscription = (clientId: string, type: string) => {
    // remove send fn
    const fnType = klineFnMap.get(type) as Set<KlineFn>;
    let _klineFn: KlineFn | null = null;
    fnType.forEach((KlineFn) => {
      if (KlineFn.clientId == clientId) {
        _klineFn = KlineFn;
      }
    });
    if (_klineFn) {
      fnType?.delete(_klineFn);
    }
    // if delete socket
    if (fnType.size == 0) {
      const socket = serverKlineWebSockets.get(type) as WebSocket;
      socket.close();
    }
  };
  return {
    add: addSubscription,
    delete: deleteSubscription,
  };
};
// TO DO  
// separate services to two different service
export const OrderService = async <T>(
  exchange: ExchangeEnum,
  symbol: SymbolEnum,
  time: TimeEnum
): Promise<serviceOrderFns<T>> => {
  await OrderSocketExist(exchange, symbol, time);
  const addSubscription = (
    Fn: (order: OrderBody) => T,
    clientId: string,
    type: string
  ) => {
    const fnType = orderFnMap.get(type);
    fnType?.add({
      clientId: clientId,
      sendFn: Fn,
    });
  };
  const deleteSubscription = (clientId: string, type: string) => {
    // remove send fn
    const fnType = orderFnMap.get(type) as Set<OrderFn>;
    let _orderFn: OrderFn | null = null;
    fnType.forEach((orderFn) => {
      if (orderFn.clientId == clientId) {
        _orderFn = orderFn;
      }
    });
    if (_orderFn) {
      fnType?.delete(_orderFn);
    }
    // if delete socket
    if (fnType.size == 0) {
      const socket = serverKlineWebSockets.get(type) as WebSocket;
      socket.close();
    }
  };
  return {
    add: addSubscription,
    delete: deleteSubscription,
  };
};

const KlineSocketExist = (
  exchange: ExchangeEnum,
  symbol: SymbolEnum,
  time: TimeEnum
): void => {
  //remove all closed socket
  for(const [type,socket] of serverKlineWebSockets){
    if(socket.readyState == 3){
      serverKlineWebSockets.delete(type)
    }
  }
  //if exist
  const exist = serverKlineWebSockets.has(`${exchange}${symbol}${time}`);

  if (!exist) {
    const klineFn = newKlineWebSocketMap.get(exchange) as WebSocketObj;

    const socketObj = klineFn(time, symbol);

    serverKlineWebSockets.set(socketObj.serverType, socketObj.socket);

    klineFnMap.set(socketObj.serverType, new Set<KlineFn>());

    socketObj.socket.onmessage = (event: any) => {

      const Kline = getKlineData(event.data, exchange, symbol) as Kline;

      const functions = klineFnMap.get(socketObj.serverType);
      if (functions) {
        functions.forEach((klineFn) => {
          klineFn.sendFn(Kline);
        });
      }

    };
  }

};

const OrderSocketExist = async (
  exchange: ExchangeEnum,
  symbol: SymbolEnum,
  time: TimeEnum
): Promise<void> => {
  //remove all closed socket
  for(const [type,socket] of serverKlineWebSockets){
    if(socket.readyState == 3){
      serverKlineWebSockets.delete(type)
    }
  }
  const exist = serverOrderWebSockets.has(`${exchange}${symbol}${time}`);
  if (!exist) {
    const orderFn = newOrderWebSocketMap.get(exchange) as WebSocketObj;
    const socketObj = await orderFn(time, symbol);
    serverOrderWebSockets.set(socketObj.serverType, socketObj.socket);
    orderFnMap.set(socketObj.serverType, new Set<OrderFn>());

    socketObj.socket.onmessage = async (event: any) => {
      const formatFn = orderFormatFns.get(exchange);
      if (formatFn) {
        const order = await formatFn(JSON.parse(event.data), symbol, time);
        const functions = orderFnMap.get(socketObj.serverType);
        if (functions && order) {
          functions.forEach((orderFn) => {
            orderFn.sendFn(order);
          });
        }
      }
    };
  }
};
