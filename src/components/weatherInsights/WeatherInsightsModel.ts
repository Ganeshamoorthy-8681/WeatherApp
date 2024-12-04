import { Astro, Current } from "../../model/WeatherForecastResponseModel";

export interface WeatherInsightsModel {
  insights: Current;
  astro: Astro;
}
