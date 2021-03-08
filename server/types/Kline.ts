export type Kline = {
  open_price: number;
  close_price: number;
  high_price: number;
  low_price: number;
  volume: number;
  time: string;
};

export type KlineObj = {
  serverType: string;
  Kline: Kline;
};
