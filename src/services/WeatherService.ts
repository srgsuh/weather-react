import type {WeatherServiceInterface, WeatherState} from "../utils/types.ts";

export class OpenWeatherService implements WeatherServiceInterface {
    async getWeatherByCityName(cityName: string): Promise<WeatherState> {
        const ok = () =>{
            return {
                location: cityName,
                weather: "Rain",
                temperature: "17 C",
                humidity: "55%",
                pressure: "Normal",
            }
        }
        const error = () => new Error("Network error. Please try again later.");
        return new Promise((resolve,reject) => {
            const isOk = (Math.random() - 0.5 >= 0);
            setTimeout(() => (isOk? resolve(ok()) : reject(error())), 1500);
        })
    }
}


// export class WeatherService {
//     static async getDataByCityName(cityName: string): Promise<WeatherResponseData> {
//         const uriString = WeatherService.getUriString(cityName);
//         const response = await fetch(uriString);
//
//         if (!response.ok) {
//             return WeatherResponseData.err("Ooops! Something went wrong");
//         }
//         const data = await WeatherService.getDataFromResponse(response);
//         return WeatherResponseData.ok(data);
//     }
//
//     static appId = "8b7e2000460c7dafc611bef810634fd5";
//     static baseURL = "https://api.openweathermap.org/data/2.5/weather";
//
//     private static getUriString(cityName: string) {
//         return `${WeatherService.baseURL}?q=${cityName}&appid=${WeatherService.appId}&units=metric`
//     };
//
//     private static async getDataFromResponse(response: Response) {
//         const {
//             main: {
//                 temp: temperature,
//                 pressure: pressure,
//                 humidity: humidity,
//             },
//             weather: [{description: weather, icon}],
//             sys: {country},
//             name: city,
//         } = await response.json();
//
//         return {temperature, pressure, humidity, weather, icon, country, city};
//     };
// }