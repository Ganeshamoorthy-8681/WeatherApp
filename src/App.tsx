import "./App.css";
// require("dotenv").config();

import WeatherAppBase from "./components/WeatherAppBase/WeatherAppBase";
import ThemeContext from "./theme/theme";

function App() {
  return (
    <>
      <ThemeContext>
        <div className="container">
          <WeatherAppBase />
        </div>
      </ThemeContext>
    </>
  );
}

export default App;
