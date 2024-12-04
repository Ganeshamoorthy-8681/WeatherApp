import { Box, Chip, Typography } from "@mui/material";
import styled from "styled-components";
import { CurrentWeatherModel } from "./CurrentWeatherModel";
import { WbSunny } from "@mui/icons-material";
import NightsStayIcon from "@mui/icons-material/NightsStay";

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
  padding: 16px;
  margin: 16px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2), 0 4px 15px rgba(0, 0, 0, 0.15);
  // color: ${(props) => (props.isDay ? "#000" : "#fff")};
  // background-color: ${(props) => (props.isDay ? "#E5F6FF" : "#2F3C55")};
  transition: "background-color 0.5s";

  & .weather-details {
    display: flex;
    gap: 32px;
  }

  & img {
    align-self: flex-start;
  }
`;

const DayIcon = () => <WbSunny sx={{ fill: "yellow" }} />;
const NightIcon = () => <NightsStayIcon sx={{ color: "white" }} />;

function CurrentWeather(props: CurrentWeatherModel) {
  const { location, temperature, condition, imgSrc, widthInPercent, isDay, time } = props;
  return (
    <>
      <StyledCurrentWeatherContainer width={widthInPercent ?? 100} isDay={isDay}>
        <Box component={"section"} className="weather-details">
          <Box component={"div"}>
            <Typography variant="h6">{time}</Typography>
            <Typography className="location" variant="h5">
              {location}
            </Typography>
            <Typography variant="h4">{temperature}&#176;C</Typography>
            <Typography variant="body1">{condition}</Typography>
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
          label={isDay ? "Day" : "Night"}
        />
      </StyledCurrentWeatherContainer>
    </>
  );
}
export default CurrentWeather;
