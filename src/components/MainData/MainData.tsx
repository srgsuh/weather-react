import WeatherDisplay from "../WeatherDisplay/WeatherDisplay.tsx";
import InputForm from "../InputForm/InputForm.tsx";
import type {displayState, WeatherState, WeatherServiceInterface} from "../../utils/types.ts";
import {useState} from "react";

type MainDataProps = {
    service: WeatherServiceInterface;
}

const MainData = ({service} :MainDataProps) => {
    const defaultWeather = {
        location: "",
        weather: "",
        icon: "",
        temperature: "",
        humidity: "",
        pressure: "",
    }

    const [state, setState] = useState<displayState>("ok");
    const [data, setData] = useState<WeatherState>(defaultWeather);
    const [error, setError] = useState<string>("");

    const handleSubmit = (city: string) => {
        setState("awaiting");
        service.getWeatherByCityName(city)
            .then((obj) => {
                setState("ok");
                setData(obj)
            })
            .catch((e) => {
                setState("error");
                setError(e.message);
            });
    }

    return (
        <>
            <InputForm onSubmit={handleSubmit}></InputForm>
            <WeatherDisplay state={state} data={data} error={error}></WeatherDisplay>
        </>
    );
};

export default MainData;