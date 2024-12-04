export interface WeatherForeCastModel {
  id: number;
  time: string;
  imgSrc: string;
  temperature: string;
  conditionText?: string;
  onClick?: (value: WeatherForeCastModel) => void;
}
