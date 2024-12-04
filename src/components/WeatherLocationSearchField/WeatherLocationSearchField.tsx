import { Box, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { LocationSearchResponseModel } from "../../model/locationSearchResponseModel";
import { useCallback, useEffect, useMemo, useState } from "react";
import { WeatherLocationSearchFieldModel } from "./WeatherLocationSearchFieldModel";
import Flag from "react-world-flags";
import { countries } from "./CountryCode";
import styled from "styled-components";

const StyledAutoCompleteOptionContainer = styled.div`
  display: flex;
  max-height: 48px;
  margin: 8px 0px;
  white-space: noWrap;

  & img {
    margin-left: 8px;
    width: 32px;
  }
`;

function WeatherLocationSearchField(props: WeatherLocationSearchFieldModel) {
  const [searchKey, setSearchKey] = useState("");
  const [options, setOptions] = useState<LocationSearchResponseModel[]>([]);
  const { optionsResolver, onChange } = props;

  const countryMap = useMemo(() => new Map(countries.map(({ name, code }) => [name, code])), []);

  let isLoading = false;

  const onSearchKeyChange = useCallback(
    async function () {
      const options = await optionsResolver(searchKey);
      isLoading = true;
      setOptions(options);
    },
    [optionsResolver, searchKey]
  );

  useEffect(() => {
    onSearchKeyChange();
  }, [onSearchKeyChange]);

  function getCountryCodeFromName(country: string) {
    return countryMap.get(country);
  }

  return (
    <>
      <Autocomplete
        disableClearable
        filterOptions={(options) => options}
        disablePortal
        options={options}
        loading={isLoading}
        getOptionLabel={(option) => `${option.name}`}
        onChange={(_, value) => onChange(value as LocationSearchResponseModel)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search for your location"
            onChange={(event) => {
              setSearchKey(event.target.value);
            }}
          />
        )}
        renderOption={(props, option: LocationSearchResponseModel) => {
          const { key, ...optionProps } = props;
          return (
            <Box component="li" key={key} {...optionProps}>
              <StyledAutoCompleteOptionContainer>
                <span>
                  {option.name} | {option.region} | {option.country}
                </span>
                <Flag code={getCountryCodeFromName(option.country)} />
              </StyledAutoCompleteOptionContainer>
            </Box>
          );
        }}
      />
    </>
  );
}

export default WeatherLocationSearchField;
