export class ApiConstants {
  private static BaseEndpoint = "https://api.weatherapi.com/v1";
  static WeatherForecast = ApiConstants.BaseEndpoint + "/forecast.json";
  static SearchLocation = ApiConstants.BaseEndpoint + "/search.json";
}
