import "./App.css";
// require("dotenv").config();

import WeatherAppBase from "./components/WeatherAppBase/WeatherAppBase";

function App() {
  return (
    <>
      <WeatherAppBase />
      {/* <WeatherLocationSearchField
        optionsResolver={(searchKey) => {
          console.log(searchKey);
          return Promise.resolve(data);
        }}
        onChange={(event: unknown) => {
          console.log(event);
        }}
      ></WeatherLocationSearchField>

      <CurrentWeather
        location={"Nagapattinam"}
        temperature={27}
        condition={"Partial sunny"}
        imgSrc={"https://cdn.weatherapi.com/weather/128x128/night/302.png"}
        widthInPercent={45} isDay={false}
      ></CurrentWeather>

      <StyledBarChart data={[2001, 80, 8]} xAxisLabel={["co2", "so2", "O2"]} />
      <StyledGaugeChart value={70} fillColor={"red"} text={"bad"} valueFontSize={32} />
      <WeatherAttribute imgSrc={reactImg} title={"Wind"} value={"90"}></WeatherAttribute>
      <WeatherForecast
        time={"06:00"}
        imgSrc={reactImg}
        temperature={"18"}
        conditionText={"Light Rain"}
        onClick={(event) => {
          console.log(event);
        }}
      ></WeatherForecast>
      <WeatherForeCastAccordion
        isAccordionOpen={true}
        header={{
          title: "Today's ForeCast",
          temperature: 18,
          imgSrc: reactImg,
        }}
        content={{
          data: [
            {
              id: 1765020022,
              time: "06.00",
              imgSrc: reactImg,
              temperature: "18",
            },
            {
              id: 1765020011122,
              time: "06.00",
              imgSrc: reactImg,
              temperature: "18",
            },
          ],
          onClick: (event, id) => {
            console.log(event, id);
          },
        }}
      ></WeatherForeCastAccordion> */}
    </>
  );
}

export default App;
