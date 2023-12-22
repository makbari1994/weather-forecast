import React, { useEffect, useState } from 'react';
import moment from "moment";
import DatePicker from "react-datepicker";
import { IResponseModel } from '../models/response-model';
import { IWeather } from '../models/weather-model';
import { useDispatch, useSelector } from 'react-redux';
import { IWeatherRequestModel } from '../models/weater-request-model';
import { getWeatherHistoryAction } from '../redux/actions';
import { ILocation } from '../models/location';
type dateType = Date | null;
type propsType = {
    location: ILocation
}
const WeatherHistory = (props: propsType) => {
    const [weatherList, setWeatherList] = useState<IWeather[]>([])
    const [startDate, setStartDate] = useState<dateType>()
    const [endDate, setEndDate] = useState<dateType>(new Date())
    const dispatch = useDispatch();

    const weatherHistoryRes: IResponseModel<IWeather[]> = useSelector((item: any) => item.weatherHistory);
    useEffect(() => {
        if (weatherHistoryRes?.loading == false && !weatherHistoryRes?.error) {
            setWeatherList([...weatherHistoryRes.data])
        }
    }, [weatherHistoryRes])

    useEffect(() => {
        getWeatherHistory();
        const date = new Date();
        date.setDate(date.getDate() - 7);
        setStartDate(date)
    }, [])


    const getWeatherHistory = async () => {
        const data = {} as IWeatherRequestModel;
        data.lat = props.location.lat;
        data.lon = props.location.lng;
        data.key = '266297ad3111446eb83e1bf26c72cff4';
        const sevenMonthAgo = new Date();
        sevenMonthAgo.setDate(sevenMonthAgo.getDate() - 7);
        data.start_date = moment(startDate ? startDate : sevenMonthAgo).format("YYYY-MM-DD");
        data.end_date = moment(endDate).format("YYYY-MM-DD");
        dispatch(getWeatherHistoryAction(data))
    }

    return (
        <>

            {weatherHistoryRes?.error ? (
                <div className='alert alert-danger col-12 text-center'>
                    {weatherHistoryRes.error}
                </div>
            ) : null}
            <div className='col-12 column-responsive d-flex flex-wrap gap-3 justify-content-center align-items-start align-content-start'>
                <div className='col-auto d-flex flex-column gap-3'>
                    <div>start date</div>
                    <DatePicker dateFormat={'yyyy-MM-dd'} showMonthDropdown={true} className='form-control' selected={startDate} onChange={(date) => setStartDate(date)} />
                </div>
                <div className='col-auto d-flex flex-column gap-3'>
                    <div>end date</div>
                    <DatePicker dateFormat={'yyyy-MM-dd'} showMonthDropdown={true} className='form-control' selected={endDate} onChange={(date) => setEndDate(date)} />
                </div>
                <div className='col-auto d-flex flex-column gap-3'>
                    <div className='invisible'>invisible</div>
                    <button className='btn btn-primary' onClick={getWeatherHistory}>Search</button>
                </div>
            </div>

            {weatherHistoryRes.loading ? (
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
                        {weatherList?.map((item: any, index: number) => {
                            return (
                                <tr>
                                    <th scope="row">{index + 1}</th>
                                    <td>
                                        {item.temp} ℃  <img src={`https://cdn.weatherbit.io/static/img/icons/${item?.weather?.icon}.png`} />
                                    </td>
                                    <td>{moment(item?.timestamp_utc).format('YYYY-MM-DD hh:mm:ss')}</td>
                                </tr>
                            )
                        })}


                    </tbody>
                </table>
            )}





        </>
    )


}

export default WeatherHistory;