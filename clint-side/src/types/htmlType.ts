import { CheckboxValueType } from "antd/lib/checkbox/Group";
import { ADXOutput } from "technicalindicators/declarations/directionalmovement/ADX";
import { MACDOutput } from "technicalindicators/declarations/moving_averages/MACD";
import { Kline, orderArr, TimeEnum, webSocketData } from "./socketType";

export type Menu = {
  binance: boolean;
  bitmex: boolean;
};

export enum LineEnum {
  RSI = "RSI",
  ADX = "ADX",
  MACD = "MACD",
  MFI = "MFI",
}

export type SymbolChart = {
  title: string;
  klineData: Kline[];
  orderData: orderArr | undefined;
};

export type SymbolsMenu = {
  time: TimeEnum;
  symbols: [string, webSocketData][];
};

export type LineType = {
  ADL: number[];
  RSI: number[];
  ADX: ADXOutput[];
  ATR: number[];
  MACD: MACDOutput[];
  MFI: number[];
};

export type MainStateType = {
  menu: SymbolsMenu;
  chart: SymbolChart;
};

export type MainLineType = {
  lineChoose: CheckboxValueType[];
  lineData: {
    [k: string]: number[] | ADXOutput[] | MACDOutput[];
  } | null;
};

export type SocketState = {
  state: number;
  value: number[];
};