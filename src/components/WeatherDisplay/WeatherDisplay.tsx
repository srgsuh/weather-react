import "./WeatherDisplay.css";
import type {WeatherState, displayState} from "../../utils/types.ts";

const iconUrlPattern = "https://openweathermap.org/img/wn/{iconCode}@2x.png"


interface WeatherDisplayProps {
    state: displayState;
    error?: string;
    data?: WeatherState;
}

const WeatherDisplay = ({state, data, error}: WeatherDisplayProps) => {

    const strToP = (text: string, key:string) => {
        return <p key={key}>{text}</p>;
    }
    const toCamelCase = (str: string) => {
        return str && str[0].toUpperCase() + str.substring(1).toLowerCase();
    }

    if (state === "ok") {
        const {location, weather, icon, ...rest} = data!;
        const imgUrl = iconUrlPattern.replace("{iconCode}", icon);
        const locationInfo = (
          <h3 key={"location"}>Weather forecast in {location}:</h3>
        );
        const weatherInfo = (<p key={"weather"}>
            {icon && <img alt = {weather} src = {imgUrl}/>}
            {toCamelCase(weather)}
        </p>);
        const others = Object.entries(rest)
            .map(([k, v]) => (strToP(`${toCamelCase(k)}: ${v}`, k)));

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