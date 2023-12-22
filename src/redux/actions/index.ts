import { IWeatherRequestModel } from "../../models/weater-request-model";
import { GET_CURRENT_WEATHER, GET_FORECAST, GET_WEATHER_HISTORY } from "./../types";

export function getCurrentWeatherAction(params: IWeatherRequestModel) {
    return {
        type: GET_CURRENT_WEATHER,
        payload: params
    }
}

export function getForecastAction(params: IWeatherRequestModel) {
    return {
        type: GET_FORECAST,
        payload: params
    }
}

export function getWeatherHistoryAction(params: IWeatherRequestModel) {
    return {
        type: GET_WEATHER_HISTORY,
        payload: params
    }
}


