import { IAction } from "../../models/action-model"
import { GET_WEATHER_HISTORY, GET_WEATHER_HISTORY_ERROR, GET_WEATHER_HISTORY_SUCCESS } from "../types"


export default function weatherHistory(state = {}, action: IAction) {
    switch (action.type) {
        case GET_WEATHER_HISTORY:
            return {
                ...state,
                loading: true,
            }
        case GET_WEATHER_HISTORY_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        case GET_WEATHER_HISTORY_ERROR:
            return {
                ...state,
                loading: false,
                error: action.message,
            }
        default:
            return state
    }
}