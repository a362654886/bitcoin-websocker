import Axios from "axios";
import { TimeEnum } from "../../types/enumType";
import { SymbolEnum } from "../../types/enumType";
import { historyBasicData } from "../../types/historyType";

export const getBinanceHistory = async (
  symbol: SymbolEnum,
  intervel: TimeEnum,
  startTime: number,
  endTime: number
): Promise<historyBasicData[]> => {
  let data: historyBasicData[] = [];
  //const url = `https://api.binance.com/api/v1/klines?symbol=${symbol}&interval=${intervel}&startTime=${startTime}&endTime=${endTime}`;
  const url = `https://api.binance.com/api/v1/klines?symbol=${symbol}&interval=${intervel}&limit=1000`;
  await Axios.get(url)
    .then((response) => {
      data = response.data.map((x) => [new Date(x[6]).toLocaleString('nz',{hour12:false}), x[1], x[2], x[3], x[4],x[5]]);
    })
    .catch(() => {
      return null;
    });
  return data;
};

/*export const getStockHistory = async (
  symbol: string,
  startTime: string,
  endTime: string
): Promise<historyBasicData[]> => {
  let data: historyBasicData[] = [];
  const url = `http://api.marketstack.com/v1/eod?access_key=bafe9c18c8ff0e0f9a4838215b11bb51&symbols=${symbol}&date_from=${startTime}&date_to=${endTime}`;
  await Axios.get(url)
    .then((response) => {
      data = response.data.data.map((x) => [x.date, x.close]);
    })
    .catch(() => {
      return null;
    });
  return data;
};

export const getOilHistory = async (
  startTime: string,
  endTime: string
): Promise<historyBasicData[]> => {
  let data: historyBasicData[] = [];

  const from = new Date(startTime).getTime() / 1000;
  const to = new Date(endTime).getTime() / 1000;

  const url = `https://api.oilpriceapi.com/v1/prices?by_period[from]=${from}&by_period[to]=${to}`;
  console.log(url)
  await Axios.get(url, {
    headers: {
      'Authorization': "Token 098c11895a4806b9704082e4bea53dd7",
      'Content-Type': "application/json"
    },
  })
    .then((response) => {
      data = response.data.data.map((x) => [x.date, x.close]);
    })
    .catch(() => {
      return null;
    });
  return data;
};*/
