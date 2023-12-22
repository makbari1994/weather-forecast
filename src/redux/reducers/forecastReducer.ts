import { IAction } from "../../models/action-model"
import { GET_FORECAST, GET_FORECAST_ERROR, GET_FORECAST_SUCCESS } from "../types"


export default function forecast(state = {}, action: IAction) {
    switch (action.type) {
        case GET_FORECAST:
            return {
                ...state,
                loading: true,
            }
        case GET_FORECAST_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload
            }
        case GET_FORECAST_ERROR:
            return {
                ...state,
                loading: false,
                error: action.message,
            }
        default:
            return state
    }
}