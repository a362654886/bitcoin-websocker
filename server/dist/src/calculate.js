"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dayOnDayIncrease = void 0;
const dayOnDayIncrease = (rawData, type) => {
    const result = {
        type: type,
        time: [],
        data: [],
    };
    const arr = rawData.reverse();
    for (let i = 1; i < arr.length; i++) {
        const increasePercentage = (arr[i][1] - arr[i - 1][1]) / arr[i - 1][1];
        const date = new Date(arr[i][0]);
        const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
        result.time.push(dateString);
        const stringData = (increasePercentage * 100).toFixed(2);
        result.data.push(parseFloat(stringData));
    }
    return result;
};
exports.dayOnDayIncrease = dayOnDayIncrease;
