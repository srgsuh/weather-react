import "./WeatherDisplay.css";
import type {WeatherState, displayState} from "../../utils/types.ts";

const iconUrlPattern = "https://openweathermap.org/img/wn/{iconCode}@2x.png"


interface WeatherDisplayProps {
    state: displayState;
    error?: string;
    data?: WeatherState;
}

const WeatherDisplay = ({state, data, error}: WeatherDisplayProps) => {

    const strToP = (text: string) => {
        return <p>{text}</p>;
    }
    const toCamelCase = (str: string) => {
        return str[0].toUpperCase() + str.substring(1).toLowerCase();
    }

    if (state === "ok") {
        const {location, weather, icon, ...rest} = data!;
        const imgUrl = iconUrlPattern.replace("{iconCode}", icon);
        const locationInfo = (
          <h3>Weather forecast in {location}:</h3>
        );
        const weatherInfo = (<p>
            {icon && <img alt = {weather} src = {imgUrl}/>}
            {toCamelCase(weather)}
        </p>);
        const others = Object.entries(rest)
            .map(([k, v]) => (strToP(`${toCamelCase(k)}: ${v}`)));

        return (<>
             {[locationInfo, weatherInfo, ...others]}
        </>);
    }

    return (
        <>
            {(state === "awaiting") && <span className="loader"></span>}
            {(state === "error") && <p className="error">{error}</p>}
        </>
    );
};

export default WeatherDisplay;