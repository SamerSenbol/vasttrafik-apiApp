import { Router } from 'express';
import path from "path"; 
import fs from 'fs';                         
import updateToken, { getAllStops } from "../vasttrafik-requests"; 
const router = Router();

/* GET All routes from allLoction.json but filter data so that repeating data is not transfered */
router.get('/', (req, res, next) => {
    const file_path = path.join(__dirname, "../assets/allLocation.json");
    try {
        console.log("-start-", "\nReading File...");
        const data = JSON.parse(fs.readFileSync(file_path));
        console.log("Filtering...");
        const stations_without_track =
            data.filter((station) => {
                if (station.track === undefined) {
                    return station;
                }
            }).map((station) => {
                return station;     
            });
        res.json(stations_without_track);
        console.log("Response Sent", "\n-end-");
    } catch (err) {
        res.json(err);
        next(err);
    }
});


/* PUT (update) allLocation.json */
router.put("/", async (req, res, next) => {
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
    const token = req.headers.authorization.split(" ")[1];  
    const file_path = path.join(__dirname, "../assets/allLocation.json");
    try {
        console.log("-start-", "\nLoading all stops data...");
        const data = await getAllStops(token);
        const data_to_store = JSON.stringify(data.LocationList.StopLocation);

        console.log("Writing data to allLoction.json file...");
        fs.writeFileSync(file_path, data_to_store);
        res.json({ success: true });
        console.log("Response sent", "\n-end-");
    } catch (err) {
        if (!err.message.includes("401")) {
            res.json(err);
            next(err);
            return;
        }
        console.log("Token expired");
        try {
            console.log("Generating new token...");
            const new_token_data = await updateToken();
            const new_token = new_token_data.access_token;

            console.log("Loading all stop data...");
            const data = await getAllStops(new_token);
            const data_to_store = JSON.stringify(data.LocationList.StopLocation);

            console.log("Writing data to allLoction.json file...");
            fs.writeFileSync(file_path, data_to_store);
            res.json({
                success: true,
                token: new_token_data
            }); 
            console.log("Response sent", "\n-end-");
        } catch (err) {
            res.json(err);
            next(err);
        }
    }
});

export default router;