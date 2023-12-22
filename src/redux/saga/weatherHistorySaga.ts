import { call, put, takeEvery } from 'redux-saga/effects'
import { IAction } from '../../models/action-model';
import axios from 'axios';
import { GET_WEATHER_HISTORY, GET_WEATHER_HISTORY_ERROR, GET_WEATHER_HISTORY_SUCCESS } from '../types';
import { IWeatherRequestModel } from '../../models/weater-request-model';

const apiUrl = `https://api.weatherbit.io/v2.0/history/subhourly`;
function getApi(params: IWeatherRequestModel): any {
    return axios.get(apiUrl, { params })
}

function* fetchWeatherHistory(action: IAction): Generator {

    try {
        const res: any = yield call(getApi, action.payload);
        yield put({ type: GET_WEATHER_HISTORY_SUCCESS, payload: res?.data?.data });
    }
    catch (e: any) {
        yield put({ type: GET_WEATHER_HISTORY_ERROR, message: e?.response?.data?.error ?? 'Error in receiving information' });
    }
}

function* watherHistorySaga() {
    yield takeEvery(GET_WEATHER_HISTORY, fetchWeatherHistory);
}

export default watherHistorySaga;