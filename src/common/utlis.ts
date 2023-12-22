import { ILocation } from "../models/location";
import axios from "axios";

export const getLocation = async (): Promise<ILocation> => {
    const location = {} as ILocation;

    try {
        const pos: any = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        location.lat = pos.coords.latitude;
        location.lng = pos.coords.longitude;
    }
    catch (e) {
        const ipRes = await axios.get('https://api.db-ip.com/v2/free/self');
        const ip = ipRes.data.ipAddress;
        const locationRes = await axios.get(`http://www.geoplugin.net/json.gp?ip=${ip}`);
        location.lat = locationRes.data.geoplugin_latitude;
        location.lng = locationRes.data.geoplugin_longitude;
    }


    return {
        lat: location.lat,
        lng: location.lng
    };
};