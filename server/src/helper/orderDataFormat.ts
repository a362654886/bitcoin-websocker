import { SymbolEnum, TimeEnum } from "../../types/enumType";
import { orderArr, OrderBody } from "../../types/orderType";
import Axios from "axios";
import { WebSocketOrderObj, WebSocketOrderObjPromise } from "../../types/socketType";

export type bitMEXOrderBook = {
  symbol: string;
  timestamp: string;
  tickSize: number;
};

export const orderFormatFns = new Map<string, WebSocketOrderObj | WebSocketOrderObjPromise>()
  .set("BINANCE", (data: any, symbol: SymbolEnum, time: TimeEnum) =>
    binanceOrderDataFormat(data, symbol, time)
  )
  .set("BITMEX", (data: any, symbol: SymbolEnum, time: TimeEnum) =>
    bitMEXOrderDataFormat(data, symbol, time)
  );

//binance

export const binanceOrderDataFormat = (
  data: any,
  symbol: SymbolEnum,
  time: TimeEnum
): OrderBody => {
  const bidArr = data.b.filter((b) => b[1] != "0.00000000");
  const askArr = data.a.filter((a) => a[1] != "0.00000000");
  return {
    serverType: `BINANCE${symbol}${time}`,
    body: {
      bid: bidArr.slice(0, 10),
      ask: askArr.slice(0, 10),
    },
  };
};

//bitmex
const orderBody: OrderBody = {
  serverType: "",
  body: {
    bid: [
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
    ],
    ask: [
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
      ["", ""],
    ],
  },
};
export const bitMEXOrderDataFormat = async (
  data: any,
  symbol: SymbolEnum,
  time: TimeEnum
): Promise<OrderBody | null> => {
  if (data.table == "orderBookL2_25" && data.action == "update") {
    let result: OrderBody | null = null;
    for(let i = 0; i< data.data.length;i++){
      const price = await priceFromID(data.data[i].id, symbol);
      if (data.data[i].side == "Sell" && price) {
        orderBody.serverType = `BITMEX${symbol}${time}`;
        orderBody.body.bid.shift();
        orderBody.body.bid.push([(price * 0.1).toString(), data.data[i].size]);
        result = orderBody;
      } else if (data.data[i].side == "Buy" && price) {
        orderBody.serverType = `BITMEX${symbol}${time}`;
        orderBody.body.ask.shift();
        orderBody.body.ask.push([(price * 0.1).toString(), data.data[i].size]);
        result = orderBody;
      } 
    }
    return result;
  } else {
    return null;
  }
};

const priceFromID = async (id, symbol) => {
  const result = await getInstrumentAndIdx(symbol);
  if (result) {
    const [instrument, instrumentIdx] = result;
    return (100000000 * instrumentIdx - id) * 0.1;
  } else {
    return null;
  }
};

const getInstrumentAndIdx = async (
  symbol
): Promise<[bitMEXOrderBook, number] | null> => {
  const instrumentsList = await getSnapshot();
  const instrument: bitMEXOrderBook | undefined = instrumentsList.find(
    (i) => i.symbol === symbol
  );
  if (instrument) {
    const instrumentIdx = instrumentsList.indexOf(instrument);
    return [instrument, instrumentIdx];
  } else {
    return null;
  }
};

export const getSnapshot = async (): Promise<bitMEXOrderBook[]> => {
  let data: bitMEXOrderBook[] = [];
  const url = `https://www.bitmex.com/api/v1/instrument?columns=symbol,tickSize&start=0&count=500`;
  await Axios.get(url)
    .then((response) => {
      data = response.data;
    })
    .catch((e) => {
      //console.log(e);
    });
  return data;
};
