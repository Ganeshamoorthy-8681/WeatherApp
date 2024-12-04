import { WeatherForeCastModel } from "../WeatherForecast/WeatherForecastModel";

export interface WeatherForecastAccordionModel {
  isAccordionOpen: boolean,
  header: {
    title: string,
    temperature: number,
    imgSrc: string;
  };

  content: {
    data: WeatherForeCastModel[];
  };

}
