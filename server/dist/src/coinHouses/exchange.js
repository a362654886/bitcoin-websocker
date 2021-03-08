"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getData = exports.initialExchange = void 0;
const enumType_1 = require("../../types/enumType");
const binance_1 = require("./binance");
const bitMEXOrder_1 = require("./bitMEXOrder");
// move this codes to middleware
const initialExchange = (exchange, symbol, time, store) => {
    // middleware 
    // only server or middleware or side effect can sent dispatch 
    //const {serverId, socket} = buildExchange(exchange, symbol, time);
    // save serverSocket
    //serverWebSocketsAdd(serverId,socket);
    // initial data
    /*store.dispatch(
      createAction<string, ADD_DATA>(
        serverId,
        ADD_DATA
      )
    );*/
    // send data to redux
    /*socket.onmessage = (event: any) => {
  
      const data = getData(
        event.data,
        exchange,
        symbol,
        serverId,
        store
      );
      if(data.Kline){
        //store.dispatch(createAction<KlineObj, UPDATE_DATA>(data, UPDATE_DATA));
      }
  
    };*/
};
exports.initialExchange = initialExchange;
// user map to instead this fn
/*export const buildExchange = (
  exchange: ExchangeEnum,
  symbol: SymbolEnum,
  time: TimeEnum
): Pick<SocketType, "serverId" | "socket"> => {
  switch (exchange) {
    case ExchangeEnum.BINANCE:
      return binanceSocketStart(time, symbol);
    case ExchangeEnum.BITMEX:
      return bitMEXSocketStart(time, symbol);
  }
};*/
const getData = (eventData, exchange, symbol, type, store) => {
    const klineObj = {
        type: "",
        Kline: {
            open_price: 0,
            close_price: 0,
            high_price: 0,
            low_price: 0,
            time: "0",
        },
    };
    switch (exchange) {
        case enumType_1.ExchangeEnum.BINANCE:
            klineObj.type = type;
            klineObj.Kline = binance_1.binanceDataFormat(JSON.parse(eventData));
            break;
        case enumType_1.ExchangeEnum.BITMEX:
            //get kline data
            if (JSON.parse(eventData)) {
                klineObj.type = type;
                //klineObj.Kline = bitMEXDataFormat(JSON.parse(eventData), symbol);
            }
            //get order data
            if (JSON.parse(eventData).table == "orderBookL2_25") {
                bitMEXOrder_1.bitMEXOrderDataFormat(JSON.parse(eventData), symbol, store);
            }
    }
    return klineObj;
};
exports.getData = getData;
