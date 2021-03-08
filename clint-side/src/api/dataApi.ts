import { user } from "../types/auth-type";
import Axios from "axios";
import { chartData, historyData } from "../types/historyType";

//const basicURL = `http://localhost:3000/dev/`;
const basicURL = `http://localhost:8081/`;

export const getBinanceHistory = async (
  symbol: string,
  interval: string,
  startTime: string,
  endTime: string
): Promise<historyData[] | null> => {
  const endpoint =
    basicURL +
    `getBinanceHistory/?symbol=${symbol}&interval=${interval}&startTime=${startTime}&endTime=${endTime}`;
  return Axios.get(endpoint)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return null;
    });
};

/*export const getBitCoin = async (
  symbol: string,
  interval: string,
  startTime: string,
  endTime: string
): Promise<chartData | null> => {
  const endpoint =
    basicURL +
    `getBitCoinHistory/?symbol=${symbol}&interval=${interval}&startTime=${startTime}&endTime=${endTime}`;
  return Axios.get(endpoint)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return null;
    });
};*/

/*export const getStock = async (
  symbol: string,
  startTime: string,
  endTime: string
): Promise<chartData | null> => {
  const endpoint =
    basicURL +
    `getStockHistory/?symbol=${symbol}&startTime=${startTime}&endTime=${endTime}`;
  return Axios.get(endpoint)
    .then((response) => {
      return response.data;
    })
    .catch(() => {
      return null;
    });
};*/
