import { GaugeFormatterParams } from "@mui/x-charts";

export type GaugeChartModel = {
  startAngle?: number;
  endAngle?: number;
  value: number;
  minValue?: number;
  maxValue?: number;
  fillColor: string;
  valueFontSize?: number;
  width?: number;
  height?: number;
  text: string | ((param: GaugeFormatterParams) => string);
};
