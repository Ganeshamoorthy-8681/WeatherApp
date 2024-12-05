import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";
import { WeatherForecastAccordionModel } from "./WeatherForecastAccordionModel";
import WeatherForecast from "../WeatherForecast/WeatherForecast";
import styled from "styled-components";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const WeatherForecastAccordionHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  color: #fff;

  & .weather-condition {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-right: 12px;
  }
  & img {
    width: 48px;
  }
`;

const WeatherForecastAccordionContentContainer = styled.div`
  display: flex;
  overflow-y: auto;
`;

function WeatherForecastAccordion(props: WeatherForecastAccordionModel) {
  return (
    <>
      <Accordion defaultExpanded={props.isAccordionOpen ?? false}>
        <AccordionSummary
          sx={{
            background: "#42516E",
            "& .MuiAccordionSummary-content.Mui-expanded, & .MuiAccordionSummary-content ": { margin: "8px 0px !important" },
          }}
          expandIcon={<ExpandMoreIcon sx={{ color: "#fff" }} />}
        >
          <WeatherForecastAccordionHeaderContainer>
            <Typography variant="subtitle1" className="title">
              {props.header.title}
            </Typography>
            <Box className="weather-condition">
              <Typography variant="h6">{props.header.temperature}&#176;C</Typography>
              <img src={props.header.imgSrc} alt="" />
            </Box>
          </WeatherForecastAccordionHeaderContainer>
        </AccordionSummary>

        <AccordionDetails sx={{ backgroundColor: "#e9ebf9f6" }}>
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
