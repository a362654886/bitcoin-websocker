/**
 * subscription.test.ts
 */
import { SymbolEnum, TimeEnum, ExchangeEnum } from "../types/enumType";
import { ADD_SUBSCRIPTION, DELETE_SUBSCRIPTION, handlers } from "../src/redux/duck/subscription";

describe("test subscription reducer ", () => {
  test("add subscription test", () => {
    const state = new Map<string, Set<string>>().set(
      "BINANCEbnbbtc1m",
      new Set<string>()
    );
    const action = {
      payload: {
        subscriptionType: {
          symbol: SymbolEnum.BNBBTC,
          time: TimeEnum.oneMin,
          exchange: ExchangeEnum.BINANCE,
        },
        clientId: "client1",
      },
      type: ADD_SUBSCRIPTION as ADD_SUBSCRIPTION,
    };
    const result = new Map<string, Set<string>>().set(
      "BINANCEbnbbtc1m",
      new Set<string>().add("client1")
    );
    expect(handlers.ADD_SUBSCRIPTION(state, action)).toStrictEqual(result);
  });
  test("delete subscription test", () => {
    const state = new Map<string, Set<string>>().set(
      "BINANCEbnbbtc1m",
      new Set<string>().add("client1")
    );
    const action = {
      payload: {
        subscriptionType: {
          symbol: SymbolEnum.BNBBTC,
          time: TimeEnum.oneMin,
          exchange: ExchangeEnum.BINANCE,
        },
        clientId: "client1",
      },
      type: DELETE_SUBSCRIPTION as DELETE_SUBSCRIPTION,
    };
    const result = new Map<string, Set<string>>().set(
      "BINANCEbnbbtc1m",
      new Set<string>()
    );
    expect(handlers.DELETE_SUBSCRIPTION(state, action)).toStrictEqual(result);
  });
});
