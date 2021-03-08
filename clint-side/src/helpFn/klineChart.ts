import * as echarts from "echarts";
import { Kline } from "../types/socketType";

const upColor = "#ec0000";
const upBorderColor = "#8A0000";
const downColor = "#00da3c";
const downBorderColor = "#008F28";

export const createEchart = (id: string): echarts.ECharts => {
  const chart_dom = document.getElementById(id) as HTMLElement;
  const myChart = echarts.init(chart_dom);
  return myChart;
};

export const echartSet = (
  echart: echarts.ECharts,
  data: Kline[],
  chart_name: string
): void => {
  const _data = generateOHLC(data);
  const option = {
    dataset: {
      source: _data,
    },
    title: {
      text: chart_name,
      textStyle: {
        color: "white",
      },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "line",
      },
    },
    toolbox: {
      feature: {
        dataZoom: {
          yAxisIndex: false,
        },
      },
    },
    grid: [
      {
        left: "10%",
        right: "10%",
        bottom: 50,
      },
      {
        left: "10%",
        right: "10%",
        height: 80,
        bottom: 50,
      },
    ],
    xAxis: [
      {
        type: "category",
        scale: true,
        boundaryGap: false,
        // inverse: true,
        axisLine: { onZero: false, lineStyle: { color: "white", width: 2 } },
        splitLine: { show: false },
        splitNumber: 20,
        min: "dataMin",
        max: "dataMax",
      },
      {
        type: "category",
        gridIndex: 1,
        scale: true,
        boundaryGap: false,
        axisLine: { onZero: false },
        axisTick: { show: false },
        splitLine: { show: false },
        axisLabel: { show: false },
        splitNumber: 20,
        min: "dataMin",
        max: "dataMax",
      },
    ],
    yAxis: [
      {
        scale: true,
        splitArea: {
          show: true,
        },
        axisLine: { onZero: false, lineStyle: { color: "white", width: 2 } },
      },
      {
        scale: true,
        gridIndex: 1,
        splitNumber: 2,
        axisLabel: { show: false },
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { show: false },
      },
    ],
    visualMap: {
      show: false,
      seriesIndex: 1,
      dimension: 6,
      pieces: [
        {
          value: 1,
          color: upColor,
        },
        {
          value: -1,
          color: downColor,
        },
      ],
    },
    series: [
      {
        type: "candlestick",
        itemStyle: {
          color: upColor,
          color0: downColor,
          borderColor: upBorderColor,
          borderColor0: downBorderColor,
        },
        encode: {
          x: 0,
          y: [1, 4, 3, 2],
        },
      },
      {
        name: "Volumn",
        type: "bar",
        xAxisIndex: 1,
        yAxisIndex: 1,
        itemStyle: {
          color: "#7fbe9e",
        },
        large: true,
        encode: {
          x: 0,
          y: 5,
        },
      },
    ],
  };
  if (echart) {
    option && echart.setOption(option);
  }
};

const generateOHLC = (kline_data: Kline[]) => {
  const data: any = [];
  for (let i = 0; i < kline_data.length; i++) {
    data[i] = [
      kline_data[i].time,
      kline_data[i].open_price, // open
      kline_data[i].high_price, // highest
      kline_data[i].low_price, // lowest
      kline_data[i].close_price, // close
      0,
      getSign(
        data,
        i,
        +kline_data[i].open_price,
        +kline_data[i].close_price,
        4
      ), // sign
    ];
  }
  return data;
};

const getSign = (
  data: any,
  dataIndex: number,
  openVal: number,
  closeVal: number,
  closeDimIdx: number
) => {
  let sign;
  if (openVal > closeVal) {
    sign = -1;
  } else if (openVal < closeVal) {
    sign = 1;
  } else {
    sign =
      dataIndex > 0
        ? // If close === open, compare with close of last record
          data[dataIndex - 1][closeDimIdx] <= closeVal
          ? 1
          : -1
        : // No record of previous, set to be positive
          1;
  }

  return sign;
};

export const connectSet = (echart: echarts.ECharts, data: number[]): void => {
  const option = {
    xAxis: {
      type: "category",
      data: [],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: data,
        type: "bar",
      },
    ],
  };

  if (echart) {
    option && echart.setOption(option);
  }
};
