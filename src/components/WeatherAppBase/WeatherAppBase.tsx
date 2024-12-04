import { useState } from "react";
import { getWeatherForecast, getWeatherLocationListForAutoComplete } from "../../services/WeatherAppService";
import { Box } from "@mui/material";
import styled from "styled-components";
import WeatherLocationSearchField from "../WeatherLocationSearchField/WeatherLocationSearchField";
import { LocationSearchResponseModel } from "../../model/locationSearchResponseModel";
import { Astro, Current, ForecastDay, WeatherForeCastResponseModel } from "../../model/WeatherForecastResponseModel";
import TodayForecast from "../TodayForecast/TodayForecast";
import WeatherInsights from "../weatherInsights/WeatherInsights";
import { WeatherForeCastModel } from "../WeatherForecast/WeatherForecastModel";
import WeatherForecastAccordion from "../WeatherForecastAccordion/WeatherForecastAccordion";
import { WeatherForecastAccordionModel } from "../WeatherForecastAccordion/WeatherForecastAccordionModel";
import AirQuality from "../AirQuality/AirQuality";

interface CurrentWeatherInsights {
  astro: Astro;
  insights: Current;
}

const StyledWeatherAppBaseContainer = styled.div`
  max-width: 1400px;
  margin: auto;
  border: 1px solid red;

  & .weather-forecast-accordion {
    margin-bottom: 16px;
  }
`;

function WeatherAppBase() {
  const [weatherForeCast, setWeatherForecast] = useState<WeatherForeCastResponseModel>();
  const [currentWeatherInsights, setCurrentWeatherInsights] = useState<CurrentWeatherInsights>();

  const handleForecastClickEvent = (value: WeatherForeCastModel) => {
    updateWeatherInsights(value);
  };

  function updateWeatherInsights(data: WeatherForeCastModel): void {
    const dayInsights = weatherForeCast?.forecast.forecastday.find((dayConfig) => data.id <= dayConfig.date_epoch);
    const hourlyInsight = dayInsights?.hour.find((hourlyConfig) => hourlyConfig.time_epoch === data.id) as Current;
    const selectedInsights: CurrentWeatherInsights = {
      astro: dayInsights?.astro as Astro,
      insights: hourlyInsight,
    };
    setCurrentWeatherInsights(selectedInsights);
  }

  function prepareWeatherForecastAccordionConfig(position: number, isAccordionOpen: boolean = false): WeatherForecastAccordionModel {
    const forecast = weatherForeCast?.forecast.forecastday.at(position) as ForecastDay;
    const config: WeatherForecastAccordionModel = {
      isAccordionOpen: isAccordionOpen,
      header: {
        title: position === 1 ? `Tomorrow (${forecast.date}) Forecast` : `${forecast.date} Forecast`,
        temperature: forecast?.day.avgtemp_c as number,
        imgSrc: forecast?.day.condition.icon as string,
      },
      content: { data: getHourlyDataFromDayForecastData(forecast) },
    };
    return config;
  }

  const getHourlyDataFromDayForecastData = (foreCastDay: ForecastDay): WeatherForeCastModel[] => {
    return foreCastDay.hour.map((hourData) => {
      const config: WeatherForeCastModel = {
        id: hourData.time_epoch,
        time: hourData.time.split(" ").at(1) ?? "",
        imgSrc: hourData.condition.icon,
        temperature: hourData.temp_c.toString(),
        conditionText: hourData.condition.text,
        onClick: handleForecastClickEvent,
      };
      return config;
    });
  };

  async function handleWeatherLocationChange(value: LocationSearchResponseModel): Promise<void> {
    await getWeatherDetails(value.name);
  }

  async function getWeatherDetails(name: string): Promise<void> {
    try {
      if (name.length > 0) {
        const response = await getWeatherForecast(name);
        const currentWeatherInsights = response.forecast.forecastday.at(0) as ForecastDay;
        const insights = response.current;
        setCurrentWeatherInsights({ astro: currentWeatherInsights.astro, insights });
        setWeatherForecast(response);
      }
    } catch (error) {
      console.error("Error fetching weather details:", error);
    }
  }

  return (
    <StyledWeatherAppBaseContainer>
      <Box className="header">
        <WeatherLocationSearchField
          onChange={handleWeatherLocationChange}
          optionsResolver={getWeatherLocationListForAutoComplete}
        ></WeatherLocationSearchField>
      </Box>

      {weatherForeCast && currentWeatherInsights && (
        <>
          <Box className="content" component={"main"}>
            <TodayForecast weatherDetails={weatherForeCast} handleForecastClickEvent={handleForecastClickEvent} />
          </Box>
          <Box>
            <Box className="weather-forecast-accordion">
              <WeatherForecastAccordion {...prepareWeatherForecastAccordionConfig(1, true)} />
            </Box>

            <Box className="weather-forecast-accordion">
              <WeatherForecastAccordion {...prepareWeatherForecastAccordionConfig(2, true)} />
            </Box>
          </Box>
          <Box>
            <WeatherInsights insights={currentWeatherInsights.insights} astro={currentWeatherInsights.astro} />
          </Box>
          <Box>
            <AirQuality data={currentWeatherInsights.insights.air_quality}></AirQuality>
          </Box>
        </>
      )}
    </StyledWeatherAppBaseContainer>
  );
}
export default WeatherAppBase;
