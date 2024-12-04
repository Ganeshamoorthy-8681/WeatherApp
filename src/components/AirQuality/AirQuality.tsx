import styled from "styled-components";
import { AirQualityModel } from "./AirQualityModel";
import { Tooltip, Typography } from "@mui/material";
import StyledBarChart from "../BarChart/BarChart";
import { BarChartPropModel } from "../BarChart/BarChartModel";
import StyledGaugeChart from "../GaugeChart/GaugeChart";
import { GaugeChartModel } from "../GaugeChart/GaugeChartModel";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const AirQualityIndexMapperForUsEPA: { [key: number]: { text: string; color: string } } = {};
AirQualityIndexMapperForUsEPA[1] = { text: "Good", color: "Green" };
AirQualityIndexMapperForUsEPA[2] = { text: "Moderate", color: "#ffeb3b" };
AirQualityIndexMapperForUsEPA[3] = { text: "Sensitive Groups", color: "Orange" };
AirQualityIndexMapperForUsEPA[4] = { text: "Unhealthy", color: "Red" };
AirQualityIndexMapperForUsEPA[5] = { text: "Very Unhealthy", color: "Purple" };
AirQualityIndexMapperForUsEPA[6] = { text: "Hazardous", color: "Maroon" };

const AirQualityIndexMapperForGbIndex: { [key: number]: { text: string; color: string } } = {};
AirQualityIndexMapperForGbIndex[1] = { text: "Low", color: "Green" };
AirQualityIndexMapperForGbIndex[2] = { text: "Low", color: "Green" };
AirQualityIndexMapperForGbIndex[3] = { text: "Low", color: "Green" };
AirQualityIndexMapperForGbIndex[4] = { text: "Moderate", color: "#ffeb3b" };
AirQualityIndexMapperForGbIndex[5] = { text: "Moderate", color: "#ffeb3b" };
AirQualityIndexMapperForGbIndex[6] = { text: "Moderate", color: "#ffeb3b" };
AirQualityIndexMapperForGbIndex[7] = { text: "High", color: "Orange" };
AirQualityIndexMapperForGbIndex[8] = { text: "High", color: "Orange" };
AirQualityIndexMapperForGbIndex[9] = { text: "High", color: "Orange" };
AirQualityIndexMapperForGbIndex[10] = { text: "Very High", color: "Red" };

const StyledAirQualityContainer = styled.div`
  padding: 16px;
  background-color: #e9ebf6;
  margin: 16px;
  & .title {
    color: #898989;
    margin-left: 16px;
    font-weight: bold;
  }

  & .content {
    display: flex;
    justify-content: space-around;
    margin-top: 16px;
    gap: 32px;
  }
  & .air-pollutant-level-chart {
    min-width: 260px;
    position: relative;
    padding: 8px 16px;
    border-radius: 12px;

    & .chart-title {
      position: absolute;
      top: 24px;
      left: 30%;
      font-weight: bold;
    }
    background-color: #eff1f9;
  }

  & .air-quality-chart {
    min-width: 260px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #eff1f9;
    border-radius: 12px;
    padding: 16px;
    & .chart-title {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 12px;
      text-align: center;
      font-weight: bold;
    }
  }
`;

function AirQuality(props: AirQualityModel) {
  const { data } = props;

  function prepareBarChartConfig(): BarChartPropModel {
    const barChartConfig: BarChartPropModel = {
      data: [data.co, data.no2, data.o3, data.so2, data.pm2_5, data.pm10],
      xAxisLabel: ["Co2", "No2", "O3", "So2", "PM2.5", "PM10"],
      yAxisLabel: "Pollutant Level (μg/m³)",
      barColors: ["#FF6347", "#FF4500", "#1E90FF", "#32CD32", "#FFD700", "#FF8C00"],
      width: 360,
    };
    return barChartConfig;
  }

  function prepareGaugeChartConfigForUsEPA(): GaugeChartModel {
    const index = data["us-epa-index"];
    const gaugeChartConfig: GaugeChartModel = {
      value: data["us-epa-index"],
      fillColor: AirQualityIndexMapperForUsEPA[index].color,
      text: AirQualityIndexMapperForUsEPA[index].text,
      minValue: 0,
      maxValue: 6,
      valueFontSize: 20,
    };
    return gaugeChartConfig;
  }

  function prepareGaugeChartConfigForGbIndex(): GaugeChartModel {
    const index = data["gb-defra-index"];
    const gaugeChartConfig: GaugeChartModel = {
      value: data["gb-defra-index"],
      fillColor: AirQualityIndexMapperForGbIndex[index].color,
      text: AirQualityIndexMapperForGbIndex[index].text,
      minValue: 0,
      maxValue: 6,
      valueFontSize: 20,
    };
    return gaugeChartConfig;
  }

  return (
    <StyledAirQualityContainer>
      <Typography variant="h6" className="title">
        AIR QUALITY
      </Typography>

      <div className="content">
        <div className="air-pollutant-level-chart">
          <Typography variant="body1" className="chart-title">
            Air Pollutant Levels
          </Typography>
          <StyledBarChart {...prepareBarChartConfig()}></StyledBarChart>
        </div>

        <div className="air-quality-chart">
          <Typography variant="body1" className="chart-title">
            US EPA Index
            <Tooltip
              arrow
              placement="top"
              title={
                <Typography variant="body2">
                  A US-based index that Measures air quality based on the levels of pollutants. It categorizes air quality into 6 levels,
                  ranging from Good (1) to Hazardous (6). This helps assess potential health risks from air pollution.
                </Typography>
              }
            >
              <HelpOutlineIcon fontSize="small" />
            </Tooltip>
          </Typography>
          <StyledGaugeChart {...prepareGaugeChartConfigForUsEPA()}></StyledGaugeChart>
        </div>

        <div className="air-quality-chart">
          <Typography variant="body1" className="chart-title">
            GB DEFRA Index
            <Tooltip
              arrow
              placement="top"
              title={
                <Typography variant="body2">
                  A UK-based air quality index that tracks the concentration of pollutants and categorizes air quality into 5 levels, from
                  Low (1) to Very High (10). It provides information about potential health risks due to air pollution.
                </Typography>
              }
            >
              <HelpOutlineIcon fontSize="small" />
            </Tooltip>
          </Typography>
          <StyledGaugeChart {...prepareGaugeChartConfigForGbIndex()}></StyledGaugeChart>
        </div>
      </div>
    </StyledAirQualityContainer>
  );
}

export default AirQuality;
