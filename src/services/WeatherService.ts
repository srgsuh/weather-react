class WeatherResponseData {
    isOk: boolean;
    errorMessage?: string;
    data?: WeatherData;
    constructor(isOk: boolean, errorMessage: string, data?: WeatherData) {
        this.isOk = isOk;
        this.errorMessage = errorMessage;
        this.data = data;
    }
    static ok(data: WeatherData) {
        return new WeatherResponseData(true, "", data);
    }
    static err(errorMessage: string) {
        return new WeatherResponseData(false, errorMessage);
    }
}

type WeatherData = {
    temperature: number,
    humidity: number,
    pressure: number,
    weather?: string,
    icon?: string,
    country?: string,
    city?: string,
}

export class WeatherService {
    static async getDataByCityName(cityName: string): Promise<WeatherResponseData> {
        const uriString = WeatherService.getUriString(cityName);
        const response = await fetch(uriString);

        if (!response.ok) {
            return WeatherResponseData.err("Ooops! Something went wrong");
        }
        const data = await WeatherService.getDataFromResponse(response);
        return WeatherResponseData.ok(data);
    }

    static appId = "8b7e2000460c7dafc611bef810634fd5";
    static baseURL = "https://api.openweathermap.org/data/2.5/weather";

    private static getUriString(cityName: string) {
        return `${WeatherService.baseURL}?q=${cityName}&appid=${WeatherService.appId}&units=metric`
    };

    private static async getDataFromResponse(response: Response) {
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

        return {temperature, pressure, humidity, weather, icon, country, city};
    };
}