export interface orderTableData {
  key: number;
  price: string;
  amount: string;
}

export const addOrderKey = (rawArr: string[]): orderTableData[] =>
  rawArr.map((x, index) => {
    return {
      key: index,
      price: x[0],
      amount: x[1],
    };
  });

export const percentageReduce = (accumulator: string, currentValue: string) => {
  const result = parseFloat(accumulator) + parseFloat(currentValue);
  return result.toString();
};

export const getPercentage = (rawArr: string[],index: number) => {
  let total = 0;
  rawArr.forEach(x =>{
    total = total + parseFloat(x[1]);
  })
  const totalValue = total
  const result = ((parseFloat(rawArr[index][1])/totalValue) * 100).toFixed(2);
  return result.toString() + "%";
};
