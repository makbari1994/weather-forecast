import React, { useEffect, useState } from 'react';
import { getLocation } from '../common/utlis';
import WeatherHistory from './weather-history';
import WeatherForecast from './weather-forecast';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentWeatherAction } from '../redux/actions';
import { IWeatherRequestModel } from '../models/weater-request-model';
import { IResponseModel } from '../models/response-model';
import { IWeather } from '../models/weather-model';
import { ILocation } from '../models/location';

const Weather = () => {

    const [currentWheather, setCurrentWheather] = useState<IWeather>({} as IWeather);
    const [locationData, setLocationData] = useState<ILocation>({} as ILocation);
    const [locationError, setLocationError] = useState<boolean>(false);
    const [showForecast, setShowForecast] = useState<boolean>(false);
    const [showHistory, setShowHistory] = useState<boolean>(false);
    const dispatch = useDispatch();
    const currentWeatherRes: IResponseModel<IWeather> = useSelector((item: any) => item.currentWeather);

    useEffect(() => {
        if (currentWeatherRes?.loading == false && !currentWeatherRes?.error) {
            setCurrentWheather(currentWeatherRes.data)
        }
    }, [currentWeatherRes])

    useEffect(() => {
        getCurrentWeather();
    }, [])

    const getCurrentWeather = async () => {
        try {
            setLocationError(false)
            const location = await getLocation();
            setLocationData({ ...location })
            const data = {} as IWeatherRequestModel;
            data.lat = location.lat;
            data.lon = location.lng;
            data.key = '266297ad3111446eb83e1bf26c72cff4';
            dispatch(getCurrentWeatherAction(data))
        }
        catch (e) {
            setLocationError(true)
        }

    }

    const toggleForecast = () => {
        setShowForecast(!showForecast);
        setShowHistory(false)
    }

    const toggleHistory = () => {
        setShowForecast(false);
        setShowHistory(!showHistory)
    }

    return (
        <>
            <div className='col-12 d-flex align-items-center pt-5  flex-column'>

                {currentWeatherRes?.error ? (
                    <div className='alert alert-danger col-lg-8 col-sm-12 col-xs-12 text-center'>
                        {currentWeatherRes.error}
                    </div>
                ) : null}

                {locationError ? (
                    <div className='alert alert-danger col-lg-8 col-sm-12 col-xs-12 text-center'>
                        location not detected
                    </div>
                ) : null}

                {currentWeatherRes.loading ? (
                    <div className='spinner-border text-primary'></div>

                ) : (
                    <div className='col-8 col-sm-12 col-xs-12  mt-5 d-flex flex-wrap align-items-center justify-content-center gap-5'>
                        <div className='col-12 text-center'>
                            <h3>
                                Current Weather
                            </h3>
                        </div>
                        <div className='col-auto d-flex flex-column gap-2'>
                            <div className='value fw-bold'>
                                {currentWheather?.temp}  <img src={`https://cdn.weatherbit.io/static/img/icons/${currentWheather?.weather?.icon}.png`} />
                            </div>
                        </div>
                        <div className='col-auto d-flex flex-column gap-2'>
                            <div className='value fw-bold'>{currentWheather?.weather?.description}</div>
                        </div>
                        <div className='col-auto d-flex flex-column gap-2'>
                            <div className='value fw-bold'>{currentWheather?.ob_time}</div>
                        </div>

                        <button className='btn btn-primary' onClick={getCurrentWeather}>refresh</button>

                    </div>
                )}

                <div className='col-8 d-flex mt-5 align-items-center justify-content-center gap-5'>
                    <button className='btn btn-primary' onClick={toggleForecast}>7-day forecast</button>
                    <button className='btn btn-info' onClick={toggleHistory}>weather history</button>
                </div>

                <div className='col-lg-8 col-sm-12 col-xs-12 flex-wrap mt-5 d-flex align-items-center justify-content-center gap-5'>
                    {showForecast ? (
                        <WeatherForecast location={locationData} />
                    ) : null}
                    {showHistory ? (
                        <WeatherHistory location={locationData} />
                    ) : null}
                </div>

            </div>


        </>
    )


}

export default Weather;