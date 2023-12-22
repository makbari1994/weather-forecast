import React, { useEffect, useState } from 'react';
import { IResponseModel } from '../models/response-model';
import { IWeather } from '../models/weather-model';
import { useDispatch, useSelector } from 'react-redux';
import { IWeatherRequestModel } from '../models/weater-request-model';
import { getForecastAction } from '../redux/actions';
import { ILocation } from '../models/location';

type propsType = {
    location: ILocation
}
const WeatherForecast = (props: propsType) => {
    const [weatherList, setWeatherList] = useState<IWeather[]>([])
    const forcastRes: IResponseModel<IWeather[]> = useSelector((item: any) => item.forecast);
    const dispatch = useDispatch();

    useEffect(() => {
        if (forcastRes?.loading == false && !forcastRes?.error) {
            setWeatherList([...forcastRes?.data])
        }
    }, [forcastRes])


    useEffect(() => {
        getWeatherForecast();
    }, [])

    const getWeatherForecast = async () => {
        const data = {} as IWeatherRequestModel;
        data.lat = props.location.lat;
        data.lon = props.location.lng;
        data.key = '266297ad3111446eb83e1bf26c72cff4';
        data.days = 7;
        dispatch(getForecastAction(data))
    }


    return (
        <>


            {forcastRes?.error ? (
                <div className='alert alert-danger col-12 text-center'>
                    {forcastRes.error}
                </div>
            ) : null}

            {forcastRes.loading ? (
                <div className='spinner-border text-primary'></div>
            ) : (
                <table className="table table-striped  table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">temperature</th>
                            <th scope="col">dateTime</th>
                        </tr>
                    </thead>
                    <tbody>
                        {weatherList.map((item: any, index: number) => {
                            return (
                                <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td>
                                        {item.temp} ℃  <img src={`https://cdn.weatherbit.io/static/img/icons/${item?.weather?.icon}.png`} />
                                    </td>
                                    <td>{item?.datetime}</td>
                                </tr>
                            )
                        })}


                    </tbody>
                </table>
            )}

        </>
    )


}

export default WeatherForecast;