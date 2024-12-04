import { useState } from "react";
import { getWeatherForecast, getWeatherLocationListForAutoComplete } from "../../services/WeatherAppService";
import { Box, CircularProgress } from "@mui/material";
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
import { TimeUtil } from "../../utils/TimeUtil";
import EmptyCard from "../EmptyCard/EmptyCard";
import WeatherAppIcon from "../../assets/weather-icon.png";

interface CurrentWeatherInsights {
  astro: Astro;
  insights: Current;
}

const StyledWeatherAppBaseContainer = styled.div`
  max-width: 1400px;
  min-height: 100vh;
  margin: auto;
  background-color: #fff;

  & .weather-forecast-accordion {
    margin-top: 32px;
  }

  & .page-content {
    padding: 32px;
  }

  & .page-header {
    height: 48px;
    background-color: #e9ebf6;
    padding: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;

    & .search-field {
      flex-basis: 500px;
      flex-shrink: 2;
    }

    & .logo {
      display: flex;
      align-items: center;
      flex-shrink: 0;
      & img {
        width: 48px;
      }

      & .description {
        margin-left: 8px;
        text-transform: uppercase;
        font-size: 1.2rem;
        font-weight: bold;
      }
    }

    @media (max-width: 768px) {
      & .page-content {
        padding: 16px;
      }
    }
  }
`;

function WeatherAppBase() {
  const [weatherForeCast, setWeatherForecast] = useState<WeatherForeCastResponseModel>();
  const [currentWeatherInsights, setCurrentWeatherInsights] = useState<CurrentWeatherInsights>();
  const [loading, setLoading] = useState(false);

  const handleForecastClickEvent = (value: WeatherForeCastModel) => {
    updateWeatherInsights(value);
  };

  function updateWeatherInsights(data: WeatherForeCastModel): void {
    const dayInsights = weatherForeCast?.forecast.forecastday.find(
      (dayConfig) => new Date(dayConfig.date_epoch * 1000).getDay() === new Date(data.id * 1000).getDay()
    );
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
        title:
          position === 1 ? `Tomorrow, ${TimeUtil.getDateString(forecast.date_epoch)}` : `${TimeUtil.getDateString(forecast.date_epoch)}`,
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
        time: TimeUtil.convertTo12Hour(hourData.time.split(" ").at(1) ?? ""),
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
        setLoading(true);
        const response = await getWeatherForecast(name);
        const currentWeatherInsights = response.forecast.forecastday.at(0) as ForecastDay;
        const insights = response.current;
        setCurrentWeatherInsights({ astro: currentWeatherInsights.astro, insights });
        setWeatherForecast(response);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching weather details:", error);
    }
  }

  return (
    <Box>
      {loading && (
        <Box className="loader">
          <CircularProgress size={"3.5rem"} />
        </Box>
      )}
      <StyledWeatherAppBaseContainer>
        <Box className="page-header" component={"div"}>
          <Box className="logo">
            <img src={WeatherAppIcon} alt="weather-app-logo" />
            {/* <span className="description"> Weather Wise</span> */}
          </Box>
          <Box className="search-field">
            <WeatherLocationSearchField
              onChange={handleWeatherLocationChange}
              optionsResolver={getWeatherLocationListForAutoComplete}
            ></WeatherLocationSearchField>
          </Box>
        </Box>
        <Box className="page-content">
          {weatherForeCast && currentWeatherInsights ? (
            <>
              <Box component="main">
                <TodayForecast weatherDetails={weatherForeCast} handleForecastClickEvent={handleForecastClickEvent} />
              </Box>

              {[1, 2].map((index) => (
                <Box key={index} className="weather-forecast-accordion">
                  <WeatherForecastAccordion {...prepareWeatherForecastAccordionConfig(index, true)} />
                </Box>
              ))}

              <Box>
                <WeatherInsights insights={currentWeatherInsights.insights} astro={currentWeatherInsights.astro} />
              </Box>

              <Box>
                <AirQuality data={currentWeatherInsights.insights.air_quality} />
              </Box>
            </>
          ) : (
            <Box className="empty-card">
              <EmptyCard />
            </Box>
          )}
        </Box>
      </StyledWeatherAppBaseContainer>
    </Box>
  );
}
export default WeatherAppBase;
