export type WeatherState = {
    location: string;
    weather: string,
    icon: string,
    temperature: string,
    humidity: string,
    pressure: string,
}

export interface WeatherServiceInterface {
    getWeatherByCityName(cityName: string): Promise<WeatherState>;
}

export type displayState = "ok" | "error" | "awaiting";

