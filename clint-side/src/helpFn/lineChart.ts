import * as d3 from "d3";
import { NumberValue } from "d3";
import { ADXOutput } from "technicalindicators/declarations/directionalmovement/ADX";
import { MACDOutput } from "technicalindicators/declarations/moving_averages/MACD";

export type chartData = {
  series: {
    name: string;
    values: (number | ADXOutput | MACDOutput | undefined)[];
  }[];
  dates: number[];
};

export const linChartSvg = (
  chartData: chartData,
  xNum: number
): SVGSVGElement | null => {
  const height = 200;
  const width = 800;
  const margin = { top: 20, right: 20, bottom: 20, left: 60 };

  const x = d3.scaleLinear().domain([1, xNum]).range([80, 720]);

  const y = d3
    .scaleLinear()
    .domain([-60, 100])
    .nice()
    .range([height - margin.bottom, margin.top]);

  const xAxis = (g: any) =>
    g.attr("transform", `translate(0,${height - margin.bottom})`).call(
      d3
        .axisBottom(x)
        .ticks(width / 80)
        .tickSizeOuter(0)
    );

  const yAxis = (g: any) =>
    g
      .attr("transform", `translate(${margin.left},0)`)
      .attr("color", "white")
      .call(d3.axisLeft(y))
      .call((g: any) => g.select(".domain").remove())
      .call((g: any) =>
        g
          .select(".tick:last-of-type text")
          .clone()
          .attr("x", 3)
          .attr("text-anchor", "start")
          .attr("font-weight", "bold")
          .attr("class", "axis")
      );

  let anyX: any = "";

  const line = d3
    .line()
    .defined((d: any) => !isNaN(d))
    .x((d, i) => {
      if (!x((chartData as chartData).dates[i])) {
        return anyX;
      } else {
        anyX = x((chartData as chartData).dates[i]);
        return x((chartData as chartData).dates[i]);
      }
    })
    .y((d: any) => {
      return y(d);
    });

  const hover = (svg: any, path: any) => {
    if ("ontouchstart" in document)
      svg
        .style("-webkit-tap-highlight-color", "transparent")
        .on("touchmove", moved)
        .on("touchstart", entered)
        .on("touchend", left);
    else
      svg
        .on("mousemove", moved)
        .on("mouseenter", entered)
        .on("mouseleave", left);

    const dot = svg.append("g").attr("display", "none");

    dot.append("circle").attr("r", 2.5);

    dot
      .append("text")
      .attr("font-family", "sans-serif")
      .attr("font-size", 10)
      .attr("text-anchor", "middle")
      .attr("y", -8);

    function moved(event: any) {
      if (chartData) {
        event.preventDefault();
        const pointer = d3.pointer(event);
        const xm = x.invert(pointer[0]);
        const ym = y.invert(pointer[1]);
        const i = d3.bisectCenter(chartData.dates, xm);
        const s = d3.least(chartData.series, (d: any) =>
          Math.abs(d.values[i] - ym)
        );
        path
          .attr("stroke", (d: any) => (d === s ? "black" : "Lavender"))
          .filter((d: any) => d === s)
          .raise();
        if (s) {
          dot.attr(
            "transform",
            `translate(${x(chartData.dates[i])},${y(s.values[i] as number)})`
          );
          dot.select("text").text(s.name);
          dot.attr("stroke", "black");
        }
      }
    }

    function entered() {
      path.style("mix-blend-mode", null).attr("stroke", "#ddd");
      dot.attr("display", null);
    }

    function left() {
      path.style("mix-blend-mode", "multiply").attr("stroke", null);
      dot.attr("display", "none");
    }
  };

  const chart = () => {
    const svg = d3.create("svg");
    svg.attr("viewBox");
    svg.attr("width", width).attr("height", height);

    svg.style("overflow", "visible");

    //svg.append("g").call(xAxis);

    svg.append("g").call(yAxis);

    const path = svg
      .append("g")
      .attr("fill", "none")
      .attr("stroke-width", 1.5)
      .attr("stroke-linejoin", "round")
      .attr("stroke-linecap", "round")
      .selectAll("path")
      .data((chartData as chartData).series)
      .join("path")
      .style("mix-blend-mode", "multiply")
      .attr("d", (d: any) => {
        return line(d.values);
      })
      .attr("stroke", (d: any) => {
        return getColor(d.name);
      });

    svg.call(hover, path);

    return svg.node();
  };
  return chart();
};

const getColor = (type: string) => {
  switch (type) {
    case "rsi":
      return "red";
    case "pdi":
      return "pink";
    case "mdi":
      return "yellow";
    case "macd":
      return "green";
    case "singal":
      return "blue";
    case "histogram":
      return "purple";
    case "MFI":
      return "cyan";
    case "adx":
      return "DeepPink";
    default:
      return "black";
  }
};
