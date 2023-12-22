import { IAction } from "../../models/action-model"
import { GET_CURRENT_WEATHER, GET_CURRENT_WEATHER_ERROR, GET_CURRENT_WEATHER_SUCCESS } from "../types"


export default function currentWeather(state = {}, action: IAction) {
    switch (action.type) {
        case GET_CURRENT_WEATHER:
            return {
                ...state,
                loading: true,
            }
        case GET_CURRENT_WEATHER_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        case GET_CURRENT_WEATHER_ERROR:
            return {
                ...state,
                loading: false,
                error: action.message,
            }
        default:
            return state
    }
}