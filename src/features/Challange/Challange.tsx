import { useQuery } from "@tanstack/react-query";
import Chart from "./Chart/Chart";
import * as API from "../../services/api";
import type { DataPoint } from "./Chart/Chart";

async function getChartData() {
  try {
    return (await API.getChartData(true)) as DataPoint[];
  } catch (e) {
    console.error(e);
  }
}

const ChallangeChart = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["data"],
    queryFn: getChartData,
    refetchOnMount: true,
  });

  return <Chart data={data} isLoading={isLoading} hasError={!!error} />;
};

export default ChallangeChart;
