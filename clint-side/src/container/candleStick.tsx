import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { candelStickSvg, CandleStickType } from "../helpFn/candelStick";
import { IStoreState } from "../types";
import { webSocketData } from "../types/socketType";
import * as d3 from "d3";
import { NumberValue } from "d3";
import { transferData } from "../helpFn/transferData";

interface IProps {
  divId: string;
  type: string;
}

const CandleStick = ({ divId, type }: IProps): JSX.Element => {
  const raw_data = {
    series: [
      {
        name: "aaa",
        values: [21, 32, 43, 54, 65],
      },
    ],
    dates: [new Date("2000-01-01")],
  };

  const div = document.getElementById(divId);

  const socketData: Map<string, webSocketData> = useSelector(
    (state: IStoreState) => state.socketData
  );
  const ref1 = useRef<any>();
  useEffect(() => {
    ref1.current = div;
  });

  useEffect(() => {
    //candle stick
    const newData = socketData.get(type);
    const klinData = newData?.klineData;
    const klineFormatData = klinData?.map((x) => {
      return {
        date: new Date(x.time),
        high: x.high_price,
        low: x.low_price,
        open: x.open_price,
        close: x.close_price,
      };
    });

    if (klineFormatData && ref1.current && div) {
      const svg = candelStickSvg(klineFormatData);
      div?.childNodes[0].replaceWith(svg.node() as SVGSVGElement);
    }
  }, [socketData]);

  return (
    <>
      <div id={divId}>
        <div></div>
      </div>
    </>
  );
};

export default CandleStick;
