import { ADXOutput } from "technicalindicators/declarations/directionalmovement/ADX";
import { MACDOutput } from "technicalindicators/declarations/moving_averages/MACD";
import { LineType } from "../types/htmlType";
import { webSocketData } from "../types/socketType";

export const transferData = (data: Map<string, webSocketData>) => {
  const resultData: {
    series: any;
    dates: any;
  } = {
    series: [],
    dates: [],
  };
  data.forEach((key, map) => {
    const obj = {
      name: map,
      values: key.klineData.map((x) => {
        if(parseFloat(x.close_price.toString())<1){
          return parseFloat(x.close_price.toString())*10000
        }else{
          return parseFloat(x.close_price.toString())*0.001
        }
      }),
    };
    const time = key.klineData.map((x) => new Date(x.time));
    resultData.series.push(obj);
    resultData.dates= time;
  });

  return resultData
};

const raw_data = {
  series: [
    {
      name: "aaa",
      values: [46, 47, 48, 49, 50],
    },
  ],
  dates: [
    new Date("2000-01-01"),
    new Date("2000-01-02"),
    new Date("2000-01-03"),
    new Date("2000-01-04"),
    new Date("2000-01-05"),
  ],
};

export const transferLineData =(linedata: {
  [k: string]: number[] | ADXOutput[] | MACDOutput[];
}) =>{
  let length = 1000;
  for(const i in linedata){
    if(linedata[i].length <length){
      length = linedata[i].length
    }
  }
  const list = Array.from(new Array(length).keys())
  const data = {
    series:[
      {
        name: "rsi",
        values: linedata.RSI?linedata.RSI.slice(0,length):[]
      },
      {
        name: "adx",
        values: linedata.ADX?(linedata.ADX as ADXOutput[]).map(x=>x.adx).slice(0,length):[]
      },
      {
        name: "pdi",
        values: linedata.ADX?(linedata.ADX as ADXOutput[]).map(x=>x.pdi).slice(0,length):[]
      },
      {
        name: "mdi",
        values: linedata.ADX?(linedata.ADX as ADXOutput[]).map(x=>x.mdi).slice(0,length):[]
      },
      {
        name: "macd",
        values: linedata.MACD?(linedata.MACD as MACDOutput[]).map(x=>x.MACD).slice(0,length):[]
      },
      {
        name: "singal",
        values: linedata.MACD?(linedata.MACD as MACDOutput[]).map(x=>x.signal).slice(0,length):[]
      },
      {
        name: "histogram",
        values: linedata.MACD?(linedata.MACD as MACDOutput[]).map(x=>x.histogram).slice(0,length):[]
      },
      {
        name: "MFI",
        values: linedata.MFI?linedata.MFI.slice(0,length):[]
      }
    ],
    datas:list,
    length: length
  }
  return data
}
