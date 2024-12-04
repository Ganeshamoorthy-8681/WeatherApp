import { WeatherForeCastResponseModel } from "../../model/WeatherForecastResponseModel";
import { WeatherForeCastModel } from "../WeatherForecast/WeatherForecastModel";

export interface TodayForecastModel {
  weatherDetails: WeatherForeCastResponseModel;
  handleForecastClickEvent: (value: WeatherForeCastModel) => void;
}
