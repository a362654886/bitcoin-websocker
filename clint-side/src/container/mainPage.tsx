import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { IStoreState } from "../types";
import { Checkbox, Radio, RadioChangeEvent, Tabs } from "antd";
import {
  ExchangeEnum,
  orderArr,
  SymbolEnum,
  TimeEnum,
  webSocketData,
} from "../types/socketType";
import { SocketState } from "../types/htmlType";
import { SUBSCRIPTION_ADD, SUBSCRIPTION_DELETE } from "../redux/subscription";
import { transferStringToObj } from "../helpFn/transferStringToObj";
import CandleStick from "./candleStick";
import { addOrderKey, getPercentage } from "../helpFn/addKey";
import * as echarts from "echarts";
import { connectSet, createEchart, echartSet } from "../helpFn/klineChart";
import { getLineData } from "../helpFn/math";
import { CheckboxValueType } from "antd/lib/checkbox/Group";
import {
  LineEnum,
  LineType,
  MainLineType,
  MainStateType,
} from "../types/htmlType";
import { transferLineData } from "../helpFn/transferData";
import { chartData, linChartSvg } from "../helpFn/lineChart";
import {
  initialFn,
  socketState,
} from "../redux/middleWares/websocketMiddleWare";
import { OPEN_SOCKET_DATA } from "../redux/socketData";
// MainPage
const MainPage = (): JSX.Element => {
  const { TabPane } = Tabs;

  const dispatch = useDispatch();
  const chartOption: LineEnum[] = [
    LineEnum.RSI,
    LineEnum.ADX,
    LineEnum.MACD,
    LineEnum.MFI,
  ];

  const initialState: MainStateType = {
    menu: {
      time: TimeEnum.oneMin,
      symbols: [],
    },
    chart: {
      title: "",
      klineData: [],
      orderData: {
        bid: [],
        ask: [],
      },
    },
  };

  const socketData: Map<string, webSocketData> = useSelector(
    (state: IStoreState) => state.socketData
  );

  const initialLineObj: MainLineType = {
    lineChoose: chartOption,
    lineData: null,
  };

  const lineChart: chartData = {
    series: [{ name: "empty", values: [1] }],
    dates: [0],
  };

  // ref div
  const lineDiv = document.getElementById("lineChart");
  const lineRef = useRef<HTMLElement | null>();
  const eChart = useRef<echarts.ECharts>();
  const connectChart = useRef<echarts.ECharts>();

  //userState
  const [mainState, setMainState] = useState<MainStateType>(initialState);
  const [lineObj, setLineObj] = useState<MainLineType>(initialLineObj);

  //use uerSelelctor
  const symbolData: [string, webSocketData][] = useSelector(
    (state: IStoreState) => Array.from(state.socketData),
    shallowEqual
  );

  const connectData: Map<string, number> = useSelector(
    (state: IStoreState) => state.socketConnection
  );

  //initial data
  useEffect(() => {
    async function initialHistory() {
      const binanceBNBBTC1m = await initialFn(
        ExchangeEnum.BINANCE,
        SymbolEnum.BNBBTC,
        TimeEnum.oneMin
      );
      dispatch({
        payload: binanceBNBBTC1m.payload,
        type: OPEN_SOCKET_DATA,
      });
    }
    //initial history data
    initialHistory();

    //get kline data and set
    initialState.chart.title = "BINANCEbtcusdt1m";
    setMainState(initialState);

    //initial chart
    eChart.current = createEchart("chart");
    const title = `${transferStringToObj(mainState.chart.title).exchange}-${
      transferStringToObj(mainState.chart.title).symbol
    },${transferStringToObj(mainState.chart.title).time}`;

    echartSet(eChart.current, mainState.chart.klineData, title);

    //initial connect chart
    connectChart.current = createEchart("socketWindow");
    connectSet(connectChart.current, [0, 0, 0, 0, 0]);
  }, []);

  // data update
  useEffect(() => {
    mainState.menu.symbols = symbolData;
    //set chart
    const title = `${transferStringToObj(mainState.chart.title).exchange}-${
      transferStringToObj(mainState.chart.title).symbol
    },${transferStringToObj(mainState.chart.title).time}`;
    if (eChart.current) {
      echartSet(eChart.current, mainState.chart.klineData, title);
    }
    //set connectchart
    if (connectChart.current) {
      const numberArr = Array.from(connectData);
      const attrArr = numberArr.map((x) => x[1]);
      connectSet(connectChart.current, attrArr.slice(-5));
    }
    //update data
    const data = mainState.menu.symbols.filter(
      (x) => x[0] == mainState.chart.title
    );
    mainState.chart.klineData = data[0] ? data[0][1].klineData : [];
    mainState.chart.orderData = data[0]
      ? data[0][1].orderData
      : {
          bid: [],
          ask: [],
        };

    // get line data and set
    const raw_lineData: LineType | null = getLineData(
      socketData,
      mainState.chart.title
    );
    let length = 0;
    if (raw_lineData) {
      const lineDataMap = new Map(Object.entries(raw_lineData));
      for (const key of lineDataMap.keys()) {
        const exist = lineObj.lineChoose
          .map((x: any) => x.toString())
          .indexOf(key.toString());

        if (exist == -1) {
          lineDataMap.delete(key);
        }
      }
      lineObj.lineData = Object.fromEntries(lineDataMap.entries());
      const newData = transferLineData(lineObj.lineData);
      lineChart.dates = newData.datas;
      lineChart.series = newData.series;
      length = newData.length;
    }
    if (!lineRef.current) {
      lineRef.current = lineDiv;
    }
    if (lineDiv) {
      lineDiv?.childNodes[0].replaceWith(
        linChartSvg(lineChart, length) as SVGSVGElement
      );
    }
  }, [symbolData]);

  const timeChange = (e: RadioChangeEvent) => {
    const oleTime = mainState.menu.time;
    const newTime = e.target.value;
    const newChartObj = mainState.menu.symbols;
    const deleteArr = new Array(mainState.menu.symbols);
    //delete old
    deleteArr[0].forEach((item) => {
      dispatch({
        data: item[0],
        type: SUBSCRIPTION_DELETE,
      });
    });
    //add new
    newChartObj.forEach((item) => {
      const newString = item[0].toString().replace(oleTime, newTime.toString());
      const dataObj = transferStringToObj(newString);
      dispatch({
        data: {
          type: `${dataObj.exchange}${dataObj.symbol}${dataObj.time}`,
          subscription: {
            exchange: dataObj.exchange,
            symbol: dataObj.symbol,
            time: dataObj.time,
          },
        },
        type: SUBSCRIPTION_ADD,
      });
    });
    mainState.menu.time = newTime;
    mainState.chart.title = mainState.chart.title
      .toString()
      .replace(oleTime, newTime.toString());
  };

  const lineChange = (e: CheckboxValueType[]) => (lineObj.lineChoose = e);

  const chooseChart = (key: string) => (mainState.chart.title = key);

  const getChartMenu = (): JSX.Element | JSX.Element[] => {
    return (
      <Tabs defaultActiveKey="0" onChange={chooseChart}>
        {mainState.menu.symbols.map((item, index) => (
          <TabPane
            tab={
              <div>
                <CandleStick divId={item[0]} type={item[0]} />
                <p className="menuTitle">
                  {transferStringToObj(item[0]).symbol}
                </p>
              </div>
            }
            key={item[0]}
          ></TabPane>
        ))}
      </Tabs>
    );
  };

  const getOrderHtml = (): JSX.Element | JSX.Element[] => {
    return (
      <div style={{ display: "flex" }}>
        <div>
          <div id="chart" style={{ width: "800px", height: "220px" }}></div>
          <div id="lineChart" style={{ width: "800px", display: "flex" }}>
            <p></p>
          </div>
          <div className="bottomLines" style={{ display: "flex" }}>
            <Checkbox.Group
              style={{ display: "flex", width: "80%" ,color:"white"}}
              options={chartOption}
              defaultValue={[
                LineEnum.RSI,
                LineEnum.ADX,
                LineEnum.MACD,
                LineEnum.MFI,
              ]}
              onChange={lineChange}
            />
          </div>
          <p id="rsi"></p>
          <p id="adx1"></p>
          <p id="adx2"></p>
          <p id="adx3"></p>
          <p id="macd1"></p>
          <p id="macd2"></p>
          <p id="macd3"></p>
          <p id="mfi"></p>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ margin: "1rem", display: "flex", width: "300px" }}>
            <div style={{ width: "50%" }}>
              <p className="whiteText">Bid Price</p>
              {addOrderKey((mainState.chart.orderData as orderArr).bid).map(
                (item) => (
                  <p
                    className="whiteText"
                    style={{
                      backgroundColor: "green",
                      width: getPercentage(
                        (mainState.chart.orderData as orderArr).bid,
                        item.key
                      ),
                    }}
                    key={item.key}
                  >
                    {parseFloat(item.price).toFixed(6)}
                  </p>
                )
              )}
            </div>
            <div>
              <p className="whiteText">Bid Amount</p>
              {addOrderKey((mainState.chart.orderData as orderArr).bid).map(
                (item) => (
                  <p className="whiteText" key={item.key}>
                    {parseFloat(item.amount).toFixed(6)}
                  </p>
                )
              )}
            </div>
          </div>

          <div style={{ margin: "1rem", display: "flex", width: "300px" }}>
            <div style={{ width: "50%" }}>
              <p className="whiteText">Ask Price</p>
              {addOrderKey((mainState.chart.orderData as orderArr).ask).map(
                (item) => (
                  <p
                    className="whiteText"
                    style={{
                      backgroundColor: "green",
                      width: getPercentage(
                        (mainState.chart.orderData as orderArr).ask,
                        item.key
                      ),
                    }}
                    key={item.key}
                  >
                    {parseFloat(item.price).toFixed(6)}
                  </p>
                )
              )}
            </div>
            <div>
              <p className="whiteText">Ask Amount</p>
              {addOrderKey((mainState.chart.orderData as orderArr).ask).map(
                (item) => (
                  <p className="whiteText" key={item.key}>
                    {parseFloat(item.amount).toFixed(6)}
                  </p>
                )
              )}
            </div>
          </div>        
        </div>
      </div>
    );
  };

  const getColor = () => {
    if (socketState.socket?.readyState == 1) {
      return "greenCircle";
    } else {
      return "redCircle";
    }
  };

  return (
    <>
      <div className="menu">
        <div>
          <div className="menuLabel">
            <h4 className="whiteText" style={{ width: "100px" }}>
              EXCHANGE:
            </h4>
            <div className="menuType">
              <p className="whiteText">BINANCE</p>
            </div>
          </div>
          <div className="menuLabel">
            <h4 className="whiteText" style={{ width: "100px" }}>
              TIME:
            </h4>
            <div className="menuType">
              <Radio.Group
                onChange={timeChange}
                style={{ marginBottom: 16 }}
                defaultValue={TimeEnum.oneMin}
              >
                <Radio value={TimeEnum.oneMin}>
                  <span className="whiteText">1m</span>
                </Radio>
                <Radio value={TimeEnum.threeMin}>
                  <span className="whiteText">3m</span>
                </Radio>
                <Radio value={TimeEnum.fiveMin}>
                  <span className="whiteText">5m</span>
                </Radio>
                <Radio value={TimeEnum.fifteenMin}>
                  <span className="whiteText">15m</span>
                </Radio>
                <Radio value={TimeEnum.thirtyMin}>
                  <span className="whiteText">30m</span>
                </Radio>
                <Radio value={TimeEnum.oneHour}>
                  <span className="whiteText">1h</span>
                </Radio>
                <Radio value={TimeEnum.oneDay}>
                  <span className="whiteText">1d</span>
                </Radio>
              </Radio.Group>
            </div>
          </div>
        </div>
      </div>
      <div className="menuTabs">
        <h4 className="whiteText" style={{ width: "100px" }}>
          SYMBOL:
        </h4>
        {getChartMenu()}
      </div>
      <div className="chartMain">{getOrderHtml()}</div>
      <div className="socketWindow">
        <div style={{ display: "flex", height: "20px" }}>
          <p className={getColor()}></p>
          <p>socket State</p>
        </div>
        <div id="socketWindow" style={{ width: "200px", height: "60px" }}></div>
      </div>
    </>
  );
};

export default MainPage;
