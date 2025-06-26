import type {WeatherServiceInterface, WeatherState} from "../utils/types.ts";

const appId = "8b7e2000460c7dafc611bef810634fd5";
const baseURL = "https://api.openweathermap.org/data/2.5/weather";

export class OpenWeatherService implements WeatherServiceInterface {
    async getWeatherByCityName(cityName: string): Promise<WeatherState> {
        const uriString = this.getUriString(cityName);
        const response = await fetch(uriString);

        if (!response.ok) {
            throw new Error("Network error. Please try again later.");
        }
        return this.getDataFromResponse(response);
    }

    private getUriString(cityName: string): string {
        return `${baseURL}?q=${cityName}&appid=${appId}&units=metric`;
    };

    private async getDataFromResponse(response: Response): Promise<WeatherState> {
        const {
            main: {
                temp: temperature,
                pressure: pressure,
                humidity: humidity,
            },
            weather: [{description: weather, icon}],
            sys: {country},
            name: city,
        } = await response.json();

        return {
            location: `${city}, ${country}`,
            weather: weather,
            icon: icon,
            temperature: temperature,
            humidity: humidity,
            pressure: pressure,
        }
    };
}