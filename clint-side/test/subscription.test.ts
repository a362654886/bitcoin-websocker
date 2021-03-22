/**
 * subscription.test.ts
 */
import {
  handlers,
  SUBSCRIPTION_ADD,
  SUBSCRIPTION_DELETE,
} from "../src/redux/subscription";
import {
  ExchangeEnum,
  Subscription,
  SymbolEnum,
  TimeEnum,
} from "../src/types/socketType";

describe("test subscription reducer ", () => {
  test("add subscription test", () => {
    const state = new Map<string, Subscription>().set("BINANCEbnbbtc1m", {
      exchange: ExchangeEnum.BINANCE,
      symbol: SymbolEnum.BNBBTC,
      time: TimeEnum.oneMin,
    });
    const action = {
      data: {
        type: "BINANCEbnbbtc5m",
        subscription: {
          exchange: ExchangeEnum.BINANCE,
          symbol: SymbolEnum.BNBBTC,
          time: TimeEnum.fiveMin,
        },
      },
      type: SUBSCRIPTION_ADD as SUBSCRIPTION_ADD,
    };
    const result = new Map<string, Subscription>()
      .set("BINANCEbnbbtc1m", {
        exchange: ExchangeEnum.BINANCE,
        symbol: SymbolEnum.BNBBTC,
        time: TimeEnum.oneMin,
      })
      .set("BINANCEbnbbtc5m", {
        exchange: ExchangeEnum.BINANCE,
        symbol: SymbolEnum.BNBBTC,
        time: TimeEnum.fiveMin,
      });
    expect(handlers.SUBSCRIPTION_ADD(state, action)).toStrictEqual(result);
  });
  test("delete subscription test", () => {
    const state = new Map<string, Subscription>()
      .set("BINANCEbnbbtc1m", {
        exchange: ExchangeEnum.BINANCE,
        symbol: SymbolEnum.BNBBTC,
        time: TimeEnum.oneMin,
      })
      .set("BINANCEbnbbtc5m", {
        exchange: ExchangeEnum.BINANCE,
        symbol: SymbolEnum.BNBBTC,
        time: TimeEnum.fiveMin,
      });
    const action = {
      data: "BINANCEbnbbtc5m",
      type: SUBSCRIPTION_DELETE as SUBSCRIPTION_DELETE,
    };
    const result = new Map<string, Subscription>().set("BINANCEbnbbtc1m", {
      exchange: ExchangeEnum.BINANCE,
      symbol: SymbolEnum.BNBBTC,
      time: TimeEnum.oneMin,
    });
    expect(handlers.SUBSCRIPTION_DELETE(state, action)).toStrictEqual(result);
  });
});
