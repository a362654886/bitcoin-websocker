import { Kline} from "../../types/Kline";
import { SymbolEnum } from "../../types/enumType";
import { ExchangeEnum } from "../../types/enumType";

export const getKlineData = (
  eventData: any,
  exchange: ExchangeEnum,
  symbol: SymbolEnum,
): Kline | null => {
  switch (exchange) {
    case ExchangeEnum.BINANCE:
      return binanceDataFormat(JSON.parse(eventData));
    case ExchangeEnum.BITMEX:
      //get kline data
      if (JSON.parse(eventData)) {
        return bitMEXDataFormat(JSON.parse(eventData), symbol);
      } else {
        return null;
      }
      //get order data
      /*if (JSON.parse(eventData).table == "orderBookL2_25") {
        bitMEXOrderDataFormat(JSON.parse(eventData), symbol, store);
      }*/
      break;
    default:
      return null;
  }
};

export const binanceDataFormat = (rawData: any): Kline => {
  const _date = new Date(rawData.k.t);
  return {
    open_price: rawData?.k?.o,
    close_price: rawData?.k?.c,
    high_price: rawData?.k?.h,
    low_price: rawData?.k?.l,
    volume: rawData?.k?.v,
    time: formatDate(_date),
  };
};

export const bitMEXDataFormat = (
  raw_data: any,
  symbol: SymbolEnum
): Kline | null => {
  if (raw_data.data && raw_data?.data[0].symbol == symbol&&raw_data?.data[0].open) {
    console.log(raw_data?.data[0])
    return {
      open_price: raw_data?.data[0].open,
      close_price: raw_data?.data[0].close,
      high_price: raw_data?.data[0].high,
      low_price: raw_data?.data[0].low,
      volume: 0,
      time: raw_data?.data[0].timestamp,
    };
  } else {
    return null;
  }
};

export const formatDate = (date: Date): string => {
  const y = date.getFullYear();
  const m: number = date.getMonth() + 1;
  const month = m < 10 ? "0" + m : m;
  const d = date.getDate();
  const day = d < 10 ? "0" + d : d;
  const h = date.getHours();
  const minute = date.getMinutes();
  const _minute = minute < 10 ? "0" + minute : minute;
  const second = date.getSeconds();
  const _second = minute < 10 ? "0" + second : second;
  return y + "-" + month + "-" + day + " " + h + ":" + _minute + ":" + _second;
};
