import { ExchangeEnum, SymbolEnum, TimeEnum } from "./enumType";

export type SubscriptionType = {
  subscriptionType: SubscriptObj;
  clientId: string;
};

export type SubscriptObj = {
  symbol: SymbolEnum;
  time: TimeEnum;
  exchange: ExchangeEnum;
};

export type SubscriptDelete = {
  SubscriptType: string;
  ClientId: string;
};
