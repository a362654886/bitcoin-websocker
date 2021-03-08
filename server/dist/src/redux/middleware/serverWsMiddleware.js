"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverWsMiddleware = exports.serverOrderWebSockets = exports.serverKlineWebSockets = void 0;
exports.serverKlineWebSockets = new Map();
exports.serverOrderWebSockets = new Map();
const serverWsMiddleware = (store) => (next) => async (action) => {
    next(action);
    // if set new websocket
    /*if (action.type == ADD_SUBSCRIPTION) {
  
      const key = `${action.payload.subscriptionType.exchange}${action.payload.subscriptionType.symbol}${action.payload.subscriptionType.time}`;
      // kline data
  
  
      // service
      const klineExist = serverKlineWebSockets.has(key);
  
      if (!klineExist) {
  
        //get websocket initial function
        const initialFn = newKlineWebSocketMap.get(
          action.payload.subscriptionType.exchange
        ) as WebSocketFn;
        // initial websocket
  
        const socketObj = initialFn(
          action.payload.subscriptionType.time,
          action.payload.subscriptionType.symbol
        );
  
        // save new websocket
        serverKlineWebSockets.set(socketObj.serverType, socketObj.socket);
        //send kline data to redux
  
        socketObj.socket.onmessage = (event: any) => {
        // receive
        // get client from subscription
        // directly send data to client
  
          const Kline = getKlineData(
            event.data,
            action.payload.subscriptionType.exchange,
            action.payload.subscriptionType.symbol
          );
          if (Kline) {
            const klineObj = {
              serverType: key,
              Kline: Kline,
            };
            //dispatch kline data
            store.dispatch(
              createAction<KlineObj, ADD_KLINE_DATA>(klineObj, ADD_KLINE_DATA)
            );
          }
  
          //bitmex order data
          if (JSON.parse(event.data).table == "orderBookL2_25") {
            const order = bitMEXOrderDataFormat(
              JSON.parse(event.data),
              action.payload.subscriptionType.symbol,
              action.payload.subscriptionType.time
            );
            if (order) {
              // save order socket
              const orderExist = serverOrderWebSockets.has(key);
              if (!orderExist) {
                serverOrderWebSockets.set(socketObj.serverType, socketObj.socket);
              }
              store.dispatch(
                createAction<OrderBody, UPDATE_ORDER_DATA>(
                  order,
                  UPDATE_ORDER_DATA
                )
              );
            }
          }
        };
      }
  
      // binance order data
      const orderExist = serverOrderWebSockets.has(key);
      if (!orderExist) {
        //get websocket initial function
        const initialFn = newOrderWebSocketMap.get(
          action.payload.subscriptionType.exchange
        ) as PromiseWebSocketFn;
        // initial websocket
        const socketObj = await initialFn(
          action.payload.subscriptionType.time,
          action.payload.subscriptionType.symbol
        );
        let first_process = null;
        //send order data to redux
        socketObj.socket.onmessage = (event: any) => {
          if (!first_process) {
            first_process = getFirstProcess(
              JSON.parse(event.data),
              socketObj.lastUpdateId
            );
          } else {
            const orderBody = {
              serverType: `BINANCE${action.payload.subscriptionType.symbol}${action.payload.subscriptionType.time}`,
              body: binanceOrderDataFormat(JSON.parse(event.data)),
            };
            store.dispatch(
              createAction<OrderBody, UPDATE_ORDER_DATA>(
                orderBody,
                UPDATE_ORDER_DATA
              )
            );
          }
        };
        // save new websocket
        serverOrderWebSockets.set(socketObj.serverId, socketObj.socket);
      }
    }*/
};
exports.serverWsMiddleware = serverWsMiddleware;
