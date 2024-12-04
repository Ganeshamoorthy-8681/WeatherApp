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
  display: flex;
  justify-content: space-between;
  width: ${(props) => `${props.width}%`};
  padding: 8px 16px;
  background-color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2), 0 4px 15px rgba(0, 0, 0, 0.15);
  transition: "background-color 0.5s";

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
    align-self: flex-start;
  }
  & .location {
    display: flex;
    align-items: center;
    color: #898989;
  }
  & .time {
    color: #898989;
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
            <Typography variant="h4">{temperature}&#176;C</Typography>
            <Typography className="location" variant="body1">
              <PlaceIcon fontSize="small"></PlaceIcon>
              {location}
            </Typography>
            {/* <Typography variant="body2">{condition}</Typography> */}
          </Box>
          <img src={imgSrc} alt="" />
        </Box>

        <Chip
          variant="outlined"
          sx={{
            padding: "12px",
            backgroundColor: "darkblue",
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
