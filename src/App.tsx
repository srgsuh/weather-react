import './App.css'
import Greeting from "./components/Greeting/Greeting.tsx";
import MainData from "./components/MainData/MainData.tsx";
import {OpenWeatherService} from "./services/WeatherService.ts";

const openWeatherService = new OpenWeatherService();

function App() {
  return (
    <>
        <Greeting></Greeting>
        <MainData service={openWeatherService}></MainData>
    </>
  )
}

export default App
