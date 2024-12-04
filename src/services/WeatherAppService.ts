import { ApiConstants } from "../constants/ApiConstants";
import { data as ForecastData } from "../mock-data/forecastMock";
import { data } from "../mock-data/searchLocationMock";
import { LocationSearchResponseModel } from "../model/locationSearchResponseModel";
import { WeatherForeCastResponseModel } from "../model/WeatherForecastResponseModel";

export const getWeatherForecast = async (location: string, days = 3): Promise<WeatherForeCastResponseModel> => {
  const url = `${ApiConstants.WeatherForecast}?key=2816f838f9d34bc088781339243011&q=${location}&days=${days}&aqi=yes`;
  console.log(url);
  // const response = await fetch(url, { method: "GET" });
  // if (!response.ok) {
  //   throw new Error('Network response was not ok');
  // }
  // const data = await response.json();
  // return data as WeatherForeCastResponseModel;
  return ForecastData as unknown as WeatherForeCastResponseModel;
};


export const getWeatherLocationListForAutoComplete = async (searchKey: string): Promise<LocationSearchResponseModel[]> => {
  if (searchKey.length > 0) {
    const url = `${ApiConstants.SearchLocation}?key=2816f838f9d34bc088781339243011&q=${searchKey}`;
    console.log(url);
    const response = await fetch(url, { method: "GET" });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data as LocationSearchResponseModel[];
  }
  // return Promise.resolve([])
  return data as unknown as LocationSearchResponseModel[];
};
