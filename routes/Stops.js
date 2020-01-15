import { Router } from 'express';
import path from "path"; 
import fs from 'fs';
import axios from 'axios';
import updateToken from "../vasttrafik-requests";                     

const router = Router();

router.get('/', (req, res, next) => {
    const file_path = path.join(__dirname, "../assets/allLocation.json");
    try {
        const data = JSON.parse(fs.readFileSync(file_path));
        const stations_without_track = 
            data.filter((station) => {
                if (station.track === undefined) {
                    return station; 
                }
            }).map((station) => {
                return station;    
            });

        res.json(stations_without_track);
    } catch (err) {
        res.json(err);
        next(err);
    }
});

/* GET trip details */
router.post('/trip', async (req, res, next) => {
    if (!(req.headers.authorization &&
            req.headers.authorization.split(" ")[0] === 'Bearer')) {
            
        const err = {
            name: "Missing or malformed Authorization",
            message: "Header should have Authorization as Bearer Token"
        };
        next(err); 
        res.json(err);
        return;
    }

    
});

const token = req.headers.authorization.split(" ")[1]; 
    const data = req.body;
    const url = "https://api.vasttrafik.se/bin/rest.exe/v2/trip?" +
     "originId=" + data.originId +
     "&destId=" + data.destId + 
     "&time=" + data.time + 
     "&searchForArrival=" + data.isDepOrArrTime + 
     "&date=" + data.date + 
     "&numTrips=4&needJourneyDetail=0&format=json";

    try {
        //----------- vasttrafik api call to get trip details -----------
        const response = await axios.get(url, {
            headers: {
                Authorization: "Bearer " + token
            }
        });

        res.json(response.data); 

    } catch (err) 
    
    {
        if (!err.message.includes("401")) {
        res.json(err);
        next(err);
        return;
    }
    try {
        const new_token_data = await updateToken();
        const new_token = new_token_data.access_token;

        //----------- vasttrafik api call to get trip details with new token -----------
        const res_trip = await axios.get(url, {
            headers: {
                Authorization: "Bearer " + new_token
            }
        });

        let to_send = res_trip.data;       
        to_send.token = new_token_data;     
        res.json(to_send);                 

    } catch (err) {
        res.json(err);
        next(err);
    }
}

export default router;