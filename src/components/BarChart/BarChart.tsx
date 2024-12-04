import { BarChart } from "@mui/x-charts/BarChart";
import { BarChartPropModel } from "./BarChartModel";
import { axisClasses } from "@mui/x-charts";

function StyledBarChart(props: BarChartPropModel) {
  return (
    <BarChart
      sx={{
        [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
          transform: "translateX(-10px)",
        },
      }}
      borderRadius={2}
      yAxis={[
        {
          label: props.yAxisLabel,
        },
      ]}
      xAxis={[
        {
          scaleType: "band",
          data: props.xAxisLabel,
          colorMap: { type: "ordinal", colors: props.barColors ?? ["#02b2af", "#2e96ff", "#b800d8"] },
        },
      ]}
      series={[{ data: props.data }]}
      width={props.width ?? 300}
      height={props.height ?? 300}
    />
  );
}

export default StyledBarChart;
