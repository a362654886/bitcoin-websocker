import {
  ExchangeEnum,
  SubscriptionString,
  SymbolEnum,
} from "../types/socketType";

export const transferStringToObj = (ObjString: string) => {
  const result: SubscriptionString = {
    exchange: "",
    symbol: "",
    time: "",
  };
  for (const exchange in ExchangeEnum) {
    if (ObjString.indexOf(exchange) != -1) {
      result.exchange = exchange;
    }
  }
  for (const symbol in SymbolEnum) {
    if (ObjString.indexOf(symbol.toLocaleLowerCase()) != -1) {
      result.symbol = symbol.toLocaleLowerCase();
    }
  }
  const arr = ["1m", "3m", "5m", "15m", "30m", "1h", "1d"];
  for (const index in arr) {
    if (ObjString.indexOf(arr[index]) != -1) {
      result.time = arr[index];
    }
  }
  return result;
};
