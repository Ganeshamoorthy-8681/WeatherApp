import styled from "@emotion/styled";
import CurrentWeather from "../CurrentWeather/CurrentWeather";
import { TodayForecastModel } from "./TodayForecastModel";
import { WeatherForeCastResponseModel } from "../../model/WeatherForecastResponseModel";
import { CurrentWeatherModel } from "../CurrentWeather/CurrentWeatherModel";
import Box from "@mui/material/Box";
import { WeatherForeCastModel } from "../WeatherForecast/WeatherForecastModel";
import WeatherForecast from "../WeatherForecast/WeatherForecast";
import { TimeUtil } from "../../utils/TimeUtil";

const StyledTodayForecastContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 32px;
  gap: 16px;

  & .weather-forecast-list {
    display: flex;
    padding: 8px 16px;
    overflow-y: auto;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2), 0 4px 15px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 768px) {
    flex-direction: column;
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
    time: `Today, ${TimeUtil.getDateString(weatherData.current.last_updated_epoch as number)}`,
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
          time: TimeUtil.convertTo12Hour(forecast.time.split(" ").at(1) || ""),
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

  const weatherForecastList = getWeatherHourlyForecastConfigList();

  return (
    <StyledTodayForecastContainer>
      <CurrentWeather {...getCurrentWeatherConfig(weatherDetails)} />

      {weatherForecastList.length > 0 && (
        <Box className="weather-forecast-list">
          {weatherForecastList.map((config) => (
            <WeatherForecast key={config.time} {...config} />
          ))}
        </Box>
      )}
    </StyledTodayForecastContainer>
  );
}

export default TodayForecast;
