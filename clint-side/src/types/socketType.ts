export type Client = {
  clientId: string;
  symbol: SymbolEnum;
  time: TimeEnum;
  exchange: ExchangeEnum;
};

export enum SymbolEnum {
  BTCUSDT = "btcusdt",
  BNBBTC = "bnbbtc",
  BNBBUSD = "bnbbusd",
  ETHBUSD = "ethbusd",
}

export enum TimeEnum {
  oneMin = "1m",
  threeMin = "3m",
  fiveMin = "5m",
  fifteenMin = "15m",
  thirtyMin = "30m",
  oneHour = "1h",
  oneDay = "1d",
}

export enum ExchangeEnum {
  BINANCE = "BINANCE",
  BITMEX = "BITMEX",
}

export type Kline = {
  open_price: number;
  close_price: number;
  high_price: number;
  low_price: number;
  volume: number;
  time: string;
};

export type orderArr = {
  bid: string[];
  ask: string[];
};

export type webSocketData = {
  klineData: Kline[],
  orderData: orderArr | undefined
}
export type serverData = {
  klineData: Kline,
  orderData: orderArr
}

export type SocketTypeData = {
  type: string
  data: serverData
}

export type SocketKlineData = {
  type: string
  data: Kline
}

export type SocketOrderData = {
  type: string
  data: orderArr
}

export type SocketInitialDataType = {
  exchange: ExchangeEnum,
  symbol: SymbolEnum,
  time: TimeEnum,
  data: webSocketData
}

export type Subscription = {
  exchange: ExchangeEnum,
  symbol: SymbolEnum,
  time: TimeEnum
}

export type SubscriptionString = {
  exchange: string,
  symbol: string,
  time: string
}


export type SubscriptionObj = {
  type: string
  subscription: Subscription
}