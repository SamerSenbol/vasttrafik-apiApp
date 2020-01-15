import axios from 'axios';              
import client from './credentials';     

export default async function updateToken() {

    const url_token = "https://api.vasttrafik.se/token";
    try {
        
        //----------- vasttrafik api call to get new token -----------
        const res_token = await axios.request({
            method: 'post',
            url: url_token,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: `grant_type=client_credentials&client_id=${client.key}&client_secret=${client.secret}`
        });

        return res_token.data; 

    } catch (err) {
        throw new Error(err);
    }

}

export async function getAllStops(token) {
    const url = "https://api.vasttrafik.se/bin/rest.exe/v2/location.allstops?format=json";
    try {
        //----------- vasttrafik api call to get all stops -----------
        const res = await axios.get(url, {
            headers: {
                Authorization: "Bearer " + token
            }
        });
        return res.data; 
    } catch (err) {
        throw new Error(err);
    }
}

export async function getTripDetails(token, data) {
    const url = "https://api.vasttrafik.se/bin/rest.exe/v2/trip?" +
        "originId=" + data.originId +
        "&destId=" + data.destId +
        "&time=" + data.time +
        "&searchForArrival=" + data.isDepOrArrTime +
        "&date=" + data.date +
        "&numTrips=4&needJourneyDetail=0&format=json";
    try {
        //----------- vasttrafik api call to get trip details -----------
        const res = await axios.get(url, {
            headers: {
                Authorization: "Bearer " + token
            }
        });
        return res.data;
    } catch (err) {
        throw new Error(err);
    }
}
