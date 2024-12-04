import styled from "styled-components";
import { WeatherForeCastModel } from "./WeatherForecastModel";
import { Box, Typography } from "@mui/material";

const StyledWeatherForecastContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 16px;
  align-items: center;
  justify-content: center;
  min-width: 100px;
  background-color: #e9ebf6;
  border-radius: 12px;
  margin: 8px;
  & img {
    margin: 8px 0px;
  }
  & .time,
  .weather-condition {
    color: #898989;
  }

  &:hover {
    cursor: pointer;
  }
`;

function WeatherForecast(props: WeatherForeCastModel) {
  return (
    <StyledWeatherForecastContainer
      onClick={() => {
        if (props.onClick) {
          props.onClick(props);
        }
      }}
    >
      <Typography variant="body1" className="time">
        {props.time}
      </Typography>
      <Box>
        <img src={props.imgSrc} alt="" />
      </Box>
      <Typography variant="h6"> {props.temperature}&#176;C</Typography>
    </StyledWeatherForecastContainer>
  );
}

export default WeatherForecast;
