import { chartData, historyBasicData, increaseData } from "../types/historyType";

export const dayOnDayIncrease = (
  rawData: historyBasicData[],
  type: string
): chartData => {
  const result: chartData = {
    type: type,
    time: [],
    data: [],
  };
  const arr = rawData.reverse();
  for (let i = 1; i < arr.length; i++) {
    const increasePercentage =
      (arr[i][1] - arr[i - 1][1]) / arr[i - 1][1];
      const date = new Date(arr[i][0]);
      
      const dateString = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
      result.time.push(dateString);
      const stringData: string = (increasePercentage*100).toFixed(2);
      result.data.push(parseFloat(stringData));
  }
  return result;
};
