export interface IWeather {
    temp: number;
    ob_time: string;
    weather: IWeatherData;
    timestamp_utc: string;
    datetime: string;
}
export interface IWeatherData {
    description: string;
    icon: string;
}