import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";
import { WeatherForecastAccordionModel } from "./WeatherForecastAccordionModel";
import WeatherForecast from "../WeatherForecast/WeatherForecast";
import styled from "styled-components";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const WeatherForecastAccordionHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 48px;
  width: 100%;
  padding: 0px 16px;

  & .title {
    color: #898989;
  }

  & .weather-condition {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-right: 12px;
  }
`;

const WeatherForecastAccordionContentContainer = styled.div`
  display: flex;
  // border-top: 1px solid grey;
  overflow-y: auto;
`;

function WeatherForecastAccordion(props: WeatherForecastAccordionModel) {
  return (
    <>
      <Accordion defaultExpanded={props.isAccordionOpen ?? false}>
        <AccordionSummary sx={{ background: "#e9ebf6" }} expandIcon={<ExpandMoreIcon />}>
          <WeatherForecastAccordionHeaderContainer>
            <Typography variant="h6" className="title">
              {props.header.title}
            </Typography>
            <Box className="weather-condition">
              <Typography variant="h6">{props.header.temperature}&#176;C</Typography>
              <img src={props.header.imgSrc} alt="" />
            </Box>
          </WeatherForecastAccordionHeaderContainer>
        </AccordionSummary>
        <AccordionDetails>
          <WeatherForecastAccordionContentContainer>
            {props?.content?.data?.map((weatherForecastData) => (
              <WeatherForecast key={weatherForecastData.id} {...weatherForecastData} />
            ))}
          </WeatherForecastAccordionContentContainer>
        </AccordionDetails>
      </Accordion>
    </>
  );
}
export default WeatherForecastAccordion;
