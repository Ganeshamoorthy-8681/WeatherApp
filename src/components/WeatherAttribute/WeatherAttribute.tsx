import styled from "@emotion/styled";
import { WeatherAttributeModel } from "./WeatherAttributeModel";
import { Box, Typography } from "@mui/material";

const StyledWeatherAttributeContainer = styled.div`
  display: flex;
  align-items: center;
  width: 250px;
  padding: 16px;
  box-sizing: border-box;
  gap: 32px;
  border-radius: 12px;
  background-color: #fff;

  & .attr-image {
    width: 25%;
    display: flex;
    align-self: center;
    justify-content: center;

    & img {
      width: 36px;
    }
  }
  & .attr-text-wrapper {
    display: flex;
    flex: 1;
    flex-direction: column;

    & .title {
      color: #898989;
      font-weight: bold;
    }
  }
`;

function WeatherAttribute(props: WeatherAttributeModel) {
  return (
    <StyledWeatherAttributeContainer>
      <Box className="attr-image">
        <img src={props.imgSrc} />
      </Box>
      <Box className="attr-text-wrapper">
        <Typography variant="body1" className="title">
          {props.title}
        </Typography>

        <Typography variant="h6" component="h6">
          {props.value}
        </Typography>
      </Box>
    </StyledWeatherAttributeContainer>
  );
}
export default WeatherAttribute;
