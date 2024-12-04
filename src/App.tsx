import "./App.css";
// require("dotenv").config();

import WeatherAppBase from "./components/WeatherAppBase/WeatherAppBase";

function App() {
  return (
    <>
      <div className="container">
        <WeatherAppBase />
      </div>
    </>
  );
}

export default App;
