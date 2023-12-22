export interface IWeatherRequestModel {
    lat: number;
    lon: number;
    key: string;
    start_date: string;
    end_date: string;
    days: number;
}