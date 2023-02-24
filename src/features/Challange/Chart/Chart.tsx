import { useState } from "react";
import Button from "../../../components/atoms/Button/Button";
import LineChart from "../../../components/templates/LineChart/LineChart";
import * as colors from "../../../constants/colors";

const PREDEFINED_COLORS = ["#FFFFFF", "#FFFCE2", "#C9AEEA", "#B7E4C7"];

export type DataPoint = {
  id: number;
  x: number;
  y: number;
  target: number;
  prediction: number;
  diagnosisGroupId: number;
};

type Props = {
  data?: DataPoint[];
  isLoading: boolean;
  hasError: boolean;
};

const Chart = ({ data, isLoading, hasError }: Props) => {
  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  const changeColor = () => {
    setCurrentColorIndex((prev) =>
      prev === PREDEFINED_COLORS.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <article
      style={{
        padding: "16px",
        backgroundColor: colors.WHITE,
        display: "inline-flex",
        flexDirection: "column",
        borderRadius: "4px",
        border: `1px solid ${colors.LIGHTER}`,
        boxShadow: `0 4px 16px 4px ${colors.LIGHTER}`,
      }}
    >
      <div
        style={{
          display: "flex",
          margin: "16px 16px 16px 16px",
          paddingBottom: "16px",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: `1px solid ${colors.LIGHTER}`,
        }}
      >
        <h1
          style={{
            fontFamily: "sans-serif",
            color: colors.DARKER,
          }}
        >
          Simple Line chart
        </h1>
        <Button text='Change Color' onClick={changeColor} />
      </div>
      <LineChart
        data={data}
        width={700}
        background={PREDEFINED_COLORS[currentColorIndex]}
        xAccessor={(d: DataPoint) => d.x}
        yAccessor={(d: DataPoint) => d.y}
        height={400}
        margin={45}
        auxiliaryLineColor={colors.DARK}
        gridColor={colors.LIGHTER}
        lineColor={colors.BLUE}
        xAxisLabel='X'
        yAxisLabel='Y'
        isLoading={isLoading}
        hasError={hasError}
      />
    </article>
  );
};

export default Chart;
