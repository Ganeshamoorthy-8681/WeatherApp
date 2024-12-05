import styled from "styled-components";
import { WeatherForeCastModel } from "./WeatherForecastModel";
import { Box, Typography } from "@mui/material";

const StyledWeatherForecastContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px;
  align-items: center;
  justify-content: center;
  min-width: 92px;
  background-color: #fff;
  border-radius: 6px;
  margin: 8px;

  & .time,
  .weather-condition {
    color: #898989;
  }

  & img {
    height: 50px;
    margin-bottom: 4px;
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
      <Typography variant="body1" className="temp">
        {props.temperature}&#176;C
      </Typography>
    </StyledWeatherForecastContainer>
  );
}

export default WeatherForecast;
