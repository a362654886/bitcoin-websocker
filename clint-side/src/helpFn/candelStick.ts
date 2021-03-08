import * as d3 from "d3";
import { NumberValue } from "d3";

export type CandleStickType = {
  date: Date;
  high: number;
  low: number;
  open: number;
  close: number;
};

const transferToCandleData = (data: CandleStickType[]): string[] =>
  data.map(
    (x: CandleStickType) =>
      x.date.getHours().toString() + ":" + x.date.getMinutes().toString()
  );

const transferNumberType = (dateArr: any[]): NumberValue[] => {
  const stringArr: NumberValue[] = [];
  dateArr.forEach((x) => {
    if (x) {
      stringArr.push(x);
    }
  });
  return stringArr;
};

export const candelStickSvg = (data: CandleStickType[]) => {
  const height = 100;
  const width = 200;
  const margin = { top: 0, right: 0, bottom: 0, left: 80 };

  const x = d3
    .scaleBand()
    .domain(transferToCandleData(data))
    .range([0, width])
    .padding(0.9);

  const y = d3
    .scaleLinear()
    .domain(
      transferNumberType([
        d3.min(data, (d) => d.low),
        d3.max(data, (d) => d.high),
      ])
    )
    .rangeRound([100, margin.top]);

  const formatValue = d3.format(".2f");

  const formatChange = (y0: any, y1: any) => {
    const f = d3.format("+.2%");
    return f((y1 - y0) / y0);
  };

  const yAxis = (g: any) => {
    g.attr("transform", `translate(0,0)`)
      .call(
        d3
          .axisLeft(y)
          .tickFormat(d3.format("$~f"))
          .tickValues(d3.scaleLinear().domain(y.domain()).ticks())
      )
      .call((g: any) =>
        g
          .selectAll(".tick line")
          .clone()
          .attr("stroke-opacity", 0.2)
          .attr("x2", 200)
      )
      .call((g: any) => g.select(".domain").remove());
  };

  const chart = () => {
    const svg = d3.create("svg");
    svg.attr("viewBox");
    svg.attr("width", width).attr("height", height);

    svg.append("g").call(yAxis);

    const g = svg
      .append("g")
      .attr("stroke-linecap", "round")
      .attr("stroke", "black")
      .selectAll("g")
      .data(data)
      .join("g")
      .attr("transform", (d) => {
        return `translate(${x(
          d.date.getHours().toString() + ":" + d.date.getMinutes().toString()
        )},0)`;
      })

    g.append("line")
      .attr("y1", (d) => y(d.low))
      .attr("y2", (d) => y(d.high));

    g.append("line")
      .attr("y1", (d) => y(d.open))
      .attr("y2", (d) => y(d.close))
      .attr("stroke-width", x.bandwidth())
      .attr("stroke", (d) =>
        d.open > d.close
          ? d3.schemeSet1[0]
          : d.close > d.open
          ? d3.schemeSet1[2]
          : d3.schemeSet1[8]
      );

    g.append("title").text(
      (d) => `${d.date}
Open: ${formatValue(d.open)}
Close: ${formatValue(d.close)} (${formatChange(d.open, d.close)})
Low: ${formatValue(d.low)}
High: ${formatValue(d.high)}`
    );

    return svg;
  };

  return chart();
};
