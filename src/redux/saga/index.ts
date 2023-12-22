import { all } from 'redux-saga/effects'
import currentWeatherSaga from './currentWeatherSaga';
import forecastSaga from './forecastSaga';
import weatherHistorySaga from './weatherHistorySaga';

export default function* rootSaga() {
    yield all([
        currentWeatherSaga(),
        forecastSaga(),
        weatherHistorySaga()
    ])
}