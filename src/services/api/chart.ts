import { get } from "./api";
import { CHART_DATA_LINK } from "../../constants/apiLinks";

export const getChartData = async (mock: boolean = false) =>
  await get(CHART_DATA_LINK, mock);
