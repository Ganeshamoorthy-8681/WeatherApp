import styled from "styled-components";
import { WeatherInsightsModel } from "./WeatherInsightsModel";
import { WeatherAttributeModel } from "../WeatherAttribute/WeatherAttributeModel";
import windImg from "../../assets/Icon awesome-wind.svg";
import SunRiseImg from "../../assets/Icon feather-sunrise.svg";
import SunsetImg from "../../assets/Icon feather-sunset.svg";
import PrecipitationImg from "../../assets/Icon weather-raindrop.svg";
import HumidityImg from "../../assets/Exclusion 2.svg";
import PressureImg from "../../assets/Group 62.svg";
import FeelsLikeImg from "../../assets/Icon awesome-temperature-high.svg";
import VisibilityImg from "../../assets/Icon material-visibility.svg";
import WeatherAttribute from "../WeatherAttribute/WeatherAttribute";
import { Typography } from "@mui/material";

const StyledWeatherDetailsContent = styled.div`
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 16px;

  @media (max-width: 576px) {
    gap: 1rem;
    justify-content: center;
  }
`;

const StyledWeatherDetailsContainer = styled.div`
  padding: 16px;
  margin-top: 32px;
  background-color: #e9ebf6;
  border-radius: 12px;

  & .header {
    margin-left: 16px;
    color: #898989;
    font-weight: bold;
  }
`;

function createWeatherAttributeConfig(title: string, value: string, imgSrc: string): WeatherAttributeModel {
  return {
    title,
    value,
    imgSrc,
  };
}

function WeatherInsights(props: WeatherInsightsModel) {
  const { insights, astro } = props;
  function getWeatherAttributeConfigList(): WeatherAttributeModel[] {
    const windSpeedConfig = createWeatherAttributeConfig("WIND", `${insights.wind_mph} Mph`, windImg);
    const sunRiseConfig = createWeatherAttributeConfig("SUNRISE", astro.sunrise, SunRiseImg);
    const sunSetConfig = createWeatherAttributeConfig("SUNSET", astro.sunset, SunsetImg);
    const precipitationConfig = createWeatherAttributeConfig("PRECIPITATION", `${insights.precip_mm.toString()} Mm`, PrecipitationImg);
    const humidityConfig = createWeatherAttributeConfig("HUMIDITY", `${insights.humidity.toString()} %`, HumidityImg);
    const pressureConfig = createWeatherAttributeConfig("PRESSURE", `${insights.pressure_mb.toString()} Mb`, PressureImg);
    const feelsLikeConfig = createWeatherAttributeConfig("FEELS LIKE", `${insights.feelslike_c.toString()}`, FeelsLikeImg);
    const visibilityConfig = createWeatherAttributeConfig("VISIBILITY", `${insights.vis_km} Km`, VisibilityImg);

    return [
      sunRiseConfig,
      sunSetConfig,
      windSpeedConfig,
      precipitationConfig,
      humidityConfig,
      pressureConfig,
      feelsLikeConfig,
      visibilityConfig,
    ];
  }

  return (
    <StyledWeatherDetailsContainer>
      <Typography variant="h6" className="header">
        Weather Insights
      </Typography>
      <StyledWeatherDetailsContent>
        {getWeatherAttributeConfigList().map((config) => (
          <WeatherAttribute key={config.title} {...config} />
        ))}
      </StyledWeatherDetailsContent>
    </StyledWeatherDetailsContainer>
  );
}

export default WeatherInsights;
