import { Router } from 'express';
import path from "path"; 
import fs from 'fs';                     

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

export default router;