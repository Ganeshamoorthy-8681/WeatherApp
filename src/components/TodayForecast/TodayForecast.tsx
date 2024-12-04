import styled from "@emotion/styled";
import CurrentWeather from "../CurrentWeather/CurrentWeather";
import { TodayForecastModel } from "./TodayForecastModel";
import { WeatherForeCastResponseModel } from "../../model/WeatherForecastResponseModel";
import { CurrentWeatherModel } from "../CurrentWeather/CurrentWeatherModel";
import Box from "@mui/material/Box";
import { WeatherForeCastModel } from "../WeatherForecast/WeatherForecastModel";
import WeatherForecast from "../WeatherForecast/WeatherForecast";

const StyledTodayForecastContainer = styled.div`
  display: flex;
  justify-content: space-between;

  & .weather-forecast-list {
    margin: 0px 16px;
    width: 60%;
    display: flex;
    overflow-y: auto;
  }
`;

const getCurrentWeatherConfig = (weatherData: WeatherForeCastResponseModel) => {
  const currentWeatherData = weatherData.current;
  const currentWeatherConfig: CurrentWeatherModel = {
    widthInPercent: 35,
    location: weatherData.location.name,
    temperature: currentWeatherData.temp_c,
    condition: currentWeatherData.condition.text,
    imgSrc: currentWeatherData.condition.icon.replaceAll("64", "128"),
    isDay: !!currentWeatherData.is_day,
    time: weatherData.location.localtime,
  };
  return currentWeatherConfig;
};

function TodayForecast(props: TodayForecastModel) {
  const { weatherDetails, handleForecastClickEvent } = props;


  const getWeatherHourlyForecastConfigList = (): WeatherForeCastModel[] => {
    const todayHourlyForecastList = weatherDetails.forecast.forecastday.at(0)?.hour;
    const foreCastList = todayHourlyForecastList?.filter((value) => value.time_epoch * 1000 > new Date().getTime());
    if (foreCastList && foreCastList.length > 0) {
      const WeatherForeCastConfigList = foreCastList?.map((forecast) => {
        const config: WeatherForeCastModel = {
          id: forecast.time_epoch,
          time: forecast.time.split(" ").at(1) ?? "",
          imgSrc: forecast.condition.icon,
          temperature: forecast.temp_c.toString(),
          conditionText: forecast.condition.text,
          onClick: handleForecastClickEvent,
        };
        return config;
      });
      return WeatherForeCastConfigList;
    }
    return [];
  };

  return (
    <StyledTodayForecastContainer>
      <CurrentWeather {...getCurrentWeatherConfig(weatherDetails)} />
      <Box className="weather-forecast-list">
        {getWeatherHourlyForecastConfigList().map((config) => (
          <WeatherForecast key={config.time} {...config} />
        ))}
      </Box>
    </StyledTodayForecastContainer>
  );
}

export default TodayForecast;
