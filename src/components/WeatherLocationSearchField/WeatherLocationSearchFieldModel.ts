import { LocationSearchResponseModel } from "../../model/locationSearchResponseModel";

export interface WeatherLocationSearchFieldModel {
  optionsResolver: (searchKey: string) => Promise<LocationSearchResponseModel[]>;
  onChange: (event: LocationSearchResponseModel) => void;
}
