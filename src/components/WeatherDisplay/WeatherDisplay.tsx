import "./WeatherDisplay.css";
import type {WeatherState, displayState} from "../../utils/types.ts";



interface WeatherDisplayProps {
    state: displayState;
    error?: string;
    data?: WeatherState;
}

const WeatherDisplay =
    ({state, data, error}: WeatherDisplayProps) => {
    return (
        <>
            {(state === "awaiting") && <span className="loader"></span>}
            {(state === "error") && <p className="error">{error}</p>}
            {(state === "ok") &&
                Object.entries(data!)
                .map(([key, value]) => (
                    <p>{key}: {value}</p>
                ))
            }
        </>
    );
};

export default WeatherDisplay;