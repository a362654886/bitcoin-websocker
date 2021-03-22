/**
 * socketData.test.ts
 */
import {
  DELETE_SOCKET_DATA,
  handlers,
  INITIAL_SOCKET_DATA,
  UPDATE_SOCKET_DATA_KLINE,
} from "../src/redux/socketData";
import {
  ExchangeEnum,
  SymbolEnum,
  TimeEnum,
  webSocketData,
} from "../src/types/socketType";

const socketData: webSocketData = {
  klineData: [
    {
      open_price: 0.5,
      close_price: 0.5,
      high_price: 0.5,
      low_price: 0.5,
      volume: 1,
      time: "2021-03-18",
    },
  ],
  orderData: {
    bid: ["0.5", "0.6"],
    ask: ["0.5", "0.6"],
  },
};

describe("test socket data reducer ", () => {
  test("initial data test", () => {
    const state = new Map<string, webSocketData>().set("BINANCEbnbbtc1m", {
      klineData: [],
      orderData: {
        bid: [],
        ask: [],
      },
    });
    const action = {
      payload: {
        exchange: ExchangeEnum.BINANCE,
        symbol: SymbolEnum.BNBBTC,
        time: TimeEnum.oneMin,
        data: socketData,
      },
      type: INITIAL_SOCKET_DATA as INITIAL_SOCKET_DATA,
    };
    const result = new Map<string, webSocketData>().set(
      "BINANCEbnbbtc1m",
      socketData
    );
    expect(handlers.INITIAL_SOCKET_DATA(state, action)).toStrictEqual(result);
  });

  test("update data(exist) test", () => {
    const state = new Map<string, webSocketData>().set(
      "BINANCEbnbbtc1m",
      socketData
    );
    const action = {
      payload: {
        type: "BINANCEbnbbtc1m",
        data: {
          open_price: 0.6,
          close_price: 0.5,
          high_price: 0.5,
          low_price: 0.5,
          volume: 1,
          time: "2021-03-18",
        },
      },
      type: UPDATE_SOCKET_DATA_KLINE as UPDATE_SOCKET_DATA_KLINE,
    };
    const newData = {
      klineData: [
        {
          open_price: 0.6,
          close_price: 0.5,
          high_price: 0.5,
          low_price: 0.5,
          volume: 1,
          time: "2021-03-18",
        },
      ],
      orderData: {
        bid: ["0.5", "0.6"],
        ask: ["0.5", "0.6"],
      },
    };
    const result = new Map<string, webSocketData>().set(
      "BINANCEbnbbtc1m",
      newData
    );
    expect(handlers.UPDATE_SOCKET_DATA_KLINE(state, action)).toStrictEqual(
      result
    );
  });

  test("update data(no exist) test", () => {
    const state = new Map<string, webSocketData>().set(
      "BINANCEbnbbtc1m",
      socketData
    );
    const action = {
      payload: {
        type: "BINANCEbnbbtc5m",
        data: {
          open_price: 0.6,
          close_price: 0.5,
          high_price: 0.5,
          low_price: 0.5,
          volume: 1,
          time: "2021-03-18",
        },
      },
      type: UPDATE_SOCKET_DATA_KLINE as UPDATE_SOCKET_DATA_KLINE,
    };
    const newData = {
      klineData: [
        {
          open_price: 0.6,
          close_price: 0.5,
          high_price: 0.5,
          low_price: 0.5,
          volume: 1,
          time: "2021-03-18",
        },
      ],
      orderData: {
        bid: [],
        ask: [],
      },
    };
    const result = new Map<string, webSocketData>()
      .set("BINANCEbnbbtc1m", socketData)
      .set("BINANCEbnbbtc5m", newData);
    expect(handlers.UPDATE_SOCKET_DATA_KLINE(state, action)).toStrictEqual(
      result
    );
  });

  test("delete data test", () => {
    const state = new Map<string, webSocketData>()
      .set("BINANCEbnbbtc1m", {
        klineData: [],
        orderData: {
          bid: [],
          ask: [],
        },
      })
      .set("BINANCEbnbbtc5m", {
        klineData: [],
        orderData: {
          bid: [],
          ask: [],
        },
      });
    const action = {
      payload: "BINANCEbnbbtc5m",
      type: DELETE_SOCKET_DATA as DELETE_SOCKET_DATA,
    };
    const result = new Map<string, webSocketData>().set(
      "BINANCEbnbbtc1m",
      {
        klineData: [],
        orderData: {
          bid: [],
          ask: [],
        },
      }
    );
    expect(handlers.DELETE_SOCKET_DATA(state, action)).toStrictEqual(result);
  });
});
