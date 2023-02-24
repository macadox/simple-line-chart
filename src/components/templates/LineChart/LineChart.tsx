import { useRef, useEffect, useState } from "react";
import * as d3 from "d3";
import Loader from "../../atoms/Loader/Loader";
import * as colors from "../../../constants/colors";

type Props<T> = {
  data?: T[];
  xAccessor: (data: T) => number;
  yAccessor: (data: T) => number;
  isLoading: boolean;
  hasError: boolean;
  width: number;
  height: number;
  margin: number;
  background: string;
  auxiliaryLineColor?: string;
  gridColor?: string;
  lineColor?: string;
  xAxisLabel?: string;
  yAxisLabel?: string;
};

const LineChart = <T,>({
  data,
  xAccessor,
  yAccessor,
  isLoading,
  hasError,
  width,
  height,
  margin,
  background,
  auxiliaryLineColor = "black",
  gridColor = "black",
  lineColor = colors.BLUE,
  xAxisLabel = "",
  yAxisLabel = "",
}: Props<T>) => {
  const chartRef = useRef<SVGSVGElement>(null);
  const [hoveredPointCoords, setHoveredPointCoords] = useState<{
    x: number;
    y: number;
  } | null>(null);

  useEffect(() => {
    if (!data) return;
    d3.select(chartRef.current).selectAll("*").remove();

    // Select chart
    const chart = d3.select(chartRef.current);

    const xScale = d3
      .scaleLinear()
      .domain(d3.extent(data, xAccessor) as [number, number])
      .range([margin, width - margin]);
    const yScale = d3
      .scaleLinear()
      .domain(d3.extent(data, yAccessor) as [number, number])
      .range([height - margin, margin]);

    // Generate X, Y Axis
    const xAxisGenerator = d3.axisBottom(xScale).ticks(data.length);
    const xAxis = chart
      .append("g")
      .attr("transform", `translate(0, ${height - margin})`)
      .attr("stroke", auxiliaryLineColor)
      .call(xAxisGenerator);
    // X axis Label
    xAxis
      .append("text")
      .attr("x", width / 2)
      .attr("y", margin - 8)
      .html(xAxisLabel);

    const yAxisGenerator = d3.axisLeft(yScale).ticks(data.length);
    const yAxis = chart
      .append("g")
      .attr("transform", `translate(${margin}, 0)`)
      .attr("stroke", auxiliaryLineColor)
      .call(yAxisGenerator);
    // Y axis Label
    yAxis
      .append("text")
      .attr("x", -height / 2)
      .attr("y", -margin + 8)
      .style("text-anchor", "middle")
      .style("transform", "rotate(-90deg)")
      .html(yAxisLabel);

    // Draw Grid
    chart.selectAll(".tick").each(function () {
      const tick = d3.select(this);
      const coordsRegex = new RegExp(/([\d.]+),([\d.]+)/, "g");
      const coords = tick.attr("transform").match(coordsRegex)?.[0].split(",");
      const translateX = coords?.[0];
      const translateY = coords?.[1];

      if (translateX) {
        tick
          .append("line")
          .style("stroke", gridColor)
          .style("stroke-width", 1)
          .style("stroke-dasharray", "0 8 0")
          .attr("x1", 0)
          .attr("y1", translateX)
          .attr("x2", width - 2 * margin)
          .attr("y2", translateX);
      }
      if (translateY) {
        tick
          .append("line")
          .style("stroke", gridColor)
          .style("stroke-width", 1)
          .style("stroke-array", "0 8 0")
          .attr("x1", -translateY)
          .attr("y1", 0)
          .attr("x2", -translateY)
          .attr("y2", -height + 2 * margin);
      }
    });

    // Generate line chart
    const lineGenerator = d3
      .line<T>()
      .x((d) => xScale(xAccessor(d)))
      .y((d) => yScale(yAccessor(d)));

    chart
      .append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", lineColor)
      .attr("stroke-width", 1.5)
      .attr("d", lineGenerator);

    // Handle mouse events
    const handleMouseMove = (e: MouseEvent) => {
      const [x, y] = d3.pointer(e);
      const mouseX = xScale.invert(x);
      const mouseY = yScale.invert(y);

      const closestPoint = data.reduce(
        (acc: { data: T | null; distance: number }, d: T) => {
          const distance = Math.hypot(
            xAccessor(d) - mouseX,
            yAccessor(d) - mouseY
          );
          if (distance < acc.distance) return { data: d, distance };
          return acc;
        },
        { data: null, distance: Infinity }
      );

      if (!closestPoint.data) return;
      const closestXValue = xAccessor(closestPoint.data);
      const closestYValue = yAccessor(closestPoint.data);
      const xCoord = xScale(closestXValue);
      const yCoord = yScale(closestYValue);

      setHoveredPointCoords({ x: xCoord, y: yCoord });
    };

    const handleMouseLeave = () => {
      setHoveredPointCoords(null);
    };

    chart.on("mousemove", handleMouseMove).on("mouseleave", handleMouseLeave);
  }, [data, width, height, margin]);

  useEffect(() => {
    const svg = d3.select(chartRef.current);
    let xLine: d3.Selection<SVGLineElement, unknown, null, undefined>;
    let yLine: d3.Selection<SVGLineElement, unknown, null, undefined>;
    let marker: d3.Selection<SVGCircleElement, unknown, null, undefined>;

    if (hoveredPointCoords) {
      const { x, y } = hoveredPointCoords;

      xLine = svg
        .append("line")
        .style("stroke", auxiliaryLineColor)
        .style("stroke-width", 1)
        .style("stroke-dasharray", "0 4 0")
        .attr("x1", 0)
        .attr("y1", y)
        .attr("x2", width)
        .attr("y2", y);

      yLine = svg
        .append("line")
        .style("stroke", auxiliaryLineColor)
        .style("stroke-width", 1)
        .style("stroke-dasharray", "0 4 0")
        .attr("x1", x)
        .attr("y1", 0)
        .attr("x2", x)
        .attr("y2", height);

      marker = svg
        .append("circle")
        .attr("cx", x)
        .attr("cy", y)
        .attr("r", 3)
        .style("fill", auxiliaryLineColor);
    }

    return () => {
      xLine?.remove();
      yLine?.remove();
      marker?.remove();
    };
  }, [hoveredPointCoords, height, width, auxiliaryLineColor]);

  return (
    <div
      style={{
        width,
        height,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {isLoading ? (
        <Loader color={colors.LIGHTER} />
      ) : hasError ? (
        <p>There was trouble loading your data</p>
      ) : (
        <svg
          ref={chartRef}
          width={width}
          height={height}
          style={{ backgroundColor: background }}
        />
      )}
    </div>
  );
};

export default LineChart;
