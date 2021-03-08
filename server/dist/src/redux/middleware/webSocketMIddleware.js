"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.webSocketMiddleware = exports.serverWebSocketsAdd = exports.clientWebSocketsAdd = void 0;
const clientWebSockets = new Map();
const serverWebSockets = new Map();
const clientWebSocketsAdd = (id, ws) => {
    clientWebSockets.set(id, ws);
};
exports.clientWebSocketsAdd = clientWebSocketsAdd;
const serverWebSocketsAdd = (type, ws) => {
    serverWebSockets.set(type, ws);
};
exports.serverWebSocketsAdd = serverWebSocketsAdd;
const webSocketMiddleware = (store) => (next) => async (action) => {
    next(action);
    // TO DO  build map in this middleware
    // should get id from redux and then find websocket and then send data
    //broadcast data
    /*if (action.type == UPDATE_DATA) {
      // get all ids
      const allIds = store.getState().clientsMap.get(action.payload.type);
      // ready data
  
  
      const klineData = store.getState().serveData.get(action.payload.type);
  
  
      const orderRawData = store.getState().orderData;
      const orderDate = orderRawData.get(
        getOrderId(action.payload.type, orderRawData)
      );
      const data = {
        klineData: klineData,
        orderData: orderDate,
      };
      
      //send data
      allIds?.forEach(id =>{
        clientWebSockets.get(id)?.send(JSON.stringify(data))
      })
    }*/
    if (action.type == "@@redux/INIT") {
        console.log("Asd");
    }
};
exports.webSocketMiddleware = webSocketMiddleware;
const getOrderId = (id, map) => {
    let result = "";
    for (const [key] of map) {
        if (id.indexOf(key) != -1) {
            result = key;
        }
    }
    return result;
};
