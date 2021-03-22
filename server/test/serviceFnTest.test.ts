/**
 * service.test.ts
 */
import { SymbolEnum, TimeEnum, ExchangeEnum } from "../types/enumType";
import {
  KlineSocketExist,
  serverKlineWebSockets,
  getService,
  klineFnMap,
  KlineFn,
} from "../src/service/service";
import { Kline } from "../types/Kline";

describe("test all service functions", () => {
  test("test kline socket exist function, if socket isn't exist system should build new socket and save it ", () => {
    KlineSocketExist(ExchangeEnum.BINANCE, SymbolEnum.BNBBTC, TimeEnum.oneMin);
    expect(serverKlineWebSockets.size).toStrictEqual(1);
  });
  test("test kline socket add function", async () => {
    KlineSocketExist(ExchangeEnum.BINANCE, SymbolEnum.BNBBTC, TimeEnum.oneMin);
    const fn = (kline: Kline) => "test";
    const service = await getService<any>(
      ExchangeEnum.BINANCE,
      SymbolEnum.BNBBTC,
      TimeEnum.oneMin
    );
    service.kline.add(fn, "client1", "BINANCEbnbbtc1m");

    const result = new Map<string, Set<KlineFn>>().set(
      "BINANCEbnbbtc1m",
      new Set<KlineFn>().add({
        clientId: "client1",
        sendFn: fn,
      })
    );
    expect(klineFnMap).toStrictEqual(result);
  });
});
