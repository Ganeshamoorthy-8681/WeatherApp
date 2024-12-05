import { Box, Chip, Typography } from "@mui/material";
import styled from "styled-components";
import { CurrentWeatherModel } from "./CurrentWeatherModel";
import { WbSunny } from "@mui/icons-material";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import PlaceIcon from "@mui/icons-material/Place";

interface StyledCurrentWeatherContainerModel {
  width: number;
  isDay: boolean;
}

const StyledCurrentWeatherContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => prop != "isDay",
})<StyledCurrentWeatherContainerModel>`
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 8px 16px;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2), 0 4px 15px rgba(0, 0, 0, 0.15);
  transition: "background-color 0.5s";
  min-width: 420px;

  @media (max-width: 576px) {
    min-width: unset;
  }

  & .weather-details {
    display: flex;
    gap: 32px;

    & .weather-content {
      display: flex;
      justify-content: space-between;
      flex-direction: column;
    }
  }

  & img {
    align-self: flex-end;

    @media (max-width: 576px) {
      width: 80px;
    }
  }
  & .location {
    display: flex;
    white-space: nowrap;
    align-items: center;
    color: #898989;
  }
  & .time {
    color: #898989;
  }

  & .is-day {
    position: absolute;
    right: 4px;
  }
`;

const DayIcon = () => <WbSunny sx={{ fill: "yellow" }} />;
const NightIcon = () => <NightsStayIcon sx={{ color: "white" }} />;

function CurrentWeather(props: CurrentWeatherModel) {
  const { location, temperature, imgSrc, widthInPercent, isDay, time } = props;
  return (
    <>
      <StyledCurrentWeatherContainer width={widthInPercent ?? 100} isDay={isDay}>
        <Box component={"section"} className="weather-details">
          <Box component={"div"} className="weather-content">
            <Typography className="time" variant="h6">
              {time}
            </Typography>
            <Typography variant="h3">{temperature}&#176;C</Typography>
            <Typography className="location" variant="subtitle1">
              <PlaceIcon fontSize="small"></PlaceIcon>
              {location}
            </Typography>
            {/* <Typography variant="body2">{condition}</Typography> */}
          </Box>
          <img src={imgSrc} alt="" />
        </Box>

        <Chip
          className="is-day"
          variant="outlined"
          sx={{
            padding: "4px",
            backgroundColor: "#42516E",
            color: "white",
          }}
          icon={isDay ? <DayIcon /> : <NightIcon />}
          label={isDay ? "DAY" : "NIGHT"}
        />
      </StyledCurrentWeatherContainer>
    </>
  );
}
export default CurrentWeather;
