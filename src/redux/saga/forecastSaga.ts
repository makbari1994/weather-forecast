import { call, put, takeEvery } from 'redux-saga/effects'
import { IAction } from '../../models/action-model';
import axios from 'axios';
import { GET_FORECAST, GET_FORECAST_ERROR, GET_FORECAST_SUCCESS } from '../types';
import { IWeatherRequestModel } from '../../models/weater-request-model';

const apiUrl = `https://api.weatherbit.io/v2.0/forecast/daily`;
function getApi(params: IWeatherRequestModel): any {
    return axios.get(apiUrl, { params })
}

function* fetchForecast(action: IAction): Generator {
    try {
        const res: any = yield call(getApi, action.payload);
        yield put({ type: GET_FORECAST_SUCCESS, payload: res?.data?.data });
    }
    catch (e: any) {
        yield put({ type: GET_FORECAST_ERROR, message: e?.response?.data?.error ?? 'Error in receiving information' });
    }

}

function* forecastSaga() {
    yield takeEvery(GET_FORECAST, fetchForecast);
}

export default forecastSaga;