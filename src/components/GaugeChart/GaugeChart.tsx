import { Gauge, gaugeClasses } from "@mui/x-charts";
import { GaugeChartModel } from "./GaugeChartModel";

function StyledGaugeChart(props: GaugeChartModel) {
  return (
    <Gauge
      sx={() => ({
        [`& .${gaugeClasses.valueText}`]: {
          fontSize: props.valueFontSize,
          fontWeight: "bold",
        },
        [`& .${gaugeClasses.valueArc}`]: {
          fill: props.fillColor,
        },
      })}
      startAngle={props.startAngle ?? 0}
      endAngle={props.endAngle ?? 360}
      width={props.width ?? 200}
      height={props.height ?? 200}
      value={props.value}
      text={props.text}
      valueMax={props.maxValue ?? 100}
      valueMin={props.minValue ?? 0}
    />
  );
}

export default StyledGaugeChart;
