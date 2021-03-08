import { SymbolEnum, TimeEnum } from "./enumType";

export type historyBasicData = {
  time: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
};


export type historyData = {
  time: string;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
};

export type increaseData = {
  type: string;
  data: historyBasicData[];
};

export type chartData = {
  type: string;
  time: string[];
  data: number[];
};

export const transferBitCoinType = (
  params: any
): {
  symbolPara: SymbolEnum;
  intervalPara: TimeEnum;
  startTimePara: number;
  endTimePara: number;
} => {
  const { symbol, interval, startTime, endTime } = params;
  const symbolPara = symbol?.toString().toLocaleUpperCase() as SymbolEnum;
  const intervalPara = interval?.toString() as TimeEnum;
  const startTimePara = +new Date(startTime?.toString());
  const endTimePara = +new Date(endTime?.toString());
  return { symbolPara, intervalPara, startTimePara, endTimePara };
};


export const transferStockType = (
  params: any
): {
  symbolPara: string;
  startTimePara: string;
  endTimePara: string;
} => {
  const { symbol, startTime, endTime } = params;
  const symbolPara = symbol?.toString().toLocaleUpperCase() as string;
  const startTimePara = startTime as string;
  const endTimePara = endTime as string;
  return { symbolPara, startTimePara, endTimePara };
};