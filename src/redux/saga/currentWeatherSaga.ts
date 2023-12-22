import { call, put, takeEvery } from 'redux-saga/effects'
import { IAction } from '../../models/action-model';
import axios from 'axios';
import { GET_CURRENT_WEATHER, GET_CURRENT_WEATHER_ERROR, GET_CURRENT_WEATHER_SUCCESS, GET_FORECAST, GET_FORECAST_SUCCESS, GET_WEATHER_HISTORY_ERROR } from '../types';
import { IWeatherRequestModel } from '../../models/weater-request-model';

const apiUrl = `https://api.weatherbit.io/v2.0/current`;
function getApi(params: IWeatherRequestModel): any {
    return axios.get(apiUrl, { params })
}

function* fetchCurrentWeather(action: IAction): Generator {
    try {
        const res: any = yield call(getApi, action.payload);
        yield put({ type: GET_CURRENT_WEATHER_SUCCESS, payload: res?.data?.data[0] });
    }
    catch (e: any) {
        yield put({ type: GET_CURRENT_WEATHER_ERROR, message: e?.response?.data?.error ?? 'Error in receiving information' });
    }
}

function* currentWeatherSaga() {
    yield takeEvery(GET_CURRENT_WEATHER, fetchCurrentWeather);
}

export default currentWeatherSaga;