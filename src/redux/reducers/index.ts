import { combineReducers } from 'redux';
import currentWeather from './currentWeatherReducer';
import forecast from './forecastReducer';
import weatherHistory from './weatherHistoryReducer';

const rootReducer = combineReducers({
    currentWeather,
    forecast,
    weatherHistory
});

export default rootReducer;