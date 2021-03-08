import { webSocketData } from "../types/socketType";
import { ADL, RSI, ADX, ATR, MACD, MFI } from "technicalindicators";
import "data-forge-fs"; // Add file system functions to Data-Forge.
import "data-forge-plot"; // Add chart plotting functions to Data-Forge.
import "data-forge-indicators"; // Add financial indicator functions to Data-Forge.
import TA from "ta-math";
import { LineType } from "../types/htmlType";


export type ADXOutput = {
  adx: number;
  pdi: number;
  mdi: number;
};

export const getLineData = (
  socketData: Map<string, webSocketData>,
  type: string
): LineType | null => {
  //const ta = new TA([], TA.exchangeFormat);
  //TypeError: ta_math__WEBPACK_IMPORTED_MODULE_4___default.a is not a constructor

  
  const webSocketData = socketData.get(type);
  const klineArr = webSocketData?.klineData;
  if (klineArr) {
    const high = klineArr?.map((x) => x.high_price) as [];
    const low = klineArr?.map((x) => x.low_price) as [];
    const close = klineArr?.map((x) => x.close_price) as [];
    const open = klineArr?.map((x) => x.open_price) as [];
    const volume = klineArr?.map((x) => x.volume) as [];
    return {
      ADL: ADL.calculate({
        high: high,
        low: low,
        close: close,
        volume: volume,
      }),
      RSI: RSI.calculate({ values: close, period: 15 }),
      ADX: ADX.calculate({
        close: close,
        high: high,
        low: low,
        period: 15,
      }),
      ATR: ATR.calculate({
        high: high,
        low: low,
        close: close,
        period: 15,
      }),
      MACD: MACD.calculate({
        values: close,
        fastPeriod: 5,
        slowPeriod: 8,
        signalPeriod: 3,
        SimpleMAOscillator: false,
        SimpleMASignal: false,
      }),
      MFI: MFI.calculate({
        high: high,
        low: low,
        close: close,
        volume: volume,
        period: 14,
      }),
    };
  } else {
    return null;
  }
};
