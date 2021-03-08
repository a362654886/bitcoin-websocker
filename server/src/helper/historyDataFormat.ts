import { historyBasicData, historyData } from "../../types/historyType";

export const historyDataFormat = (rawArr: historyBasicData[]): historyData[] => {
  const result: historyData[] = [];
  rawArr.forEach((value) => {
    const obj: historyData = {
      time: value[0],
      open: value[1],
      high: value[2],
      low: value[3],
      close: value[4],
      volume: value[5]
    };
    result.push(obj)
  });
  return result;
};
