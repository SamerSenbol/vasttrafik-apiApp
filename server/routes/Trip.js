import { Router } from 'express';
import updateToken, { getTripDetails } from '../vasttrafik-requests';
const router = Router();

/* POST trip details */
router.post('/', async (req, res, next) => {
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
    const body = req.body;
    try {
        console.log("-start-", "\nLoading Trip...");
        const data = await getTripDetails(token, body);
        res.json(data); 
        console.log("Response sent", "-end-");
    } catch (err) 
    
    {
       
        if (!err.message.includes("401")) {
            res.json(err);
            next(err);
            return;
        }
        console.log("Token expired");
        try {
            console.log("Generating new Token...");
            const new_token_data = await updateToken();
            const new_token = new_token_data.access_token;
            console.log("Loading Trip...");
            let to_send = await getTripDetails(new_token, body); 
            to_send.token = new_token_data;    
            res.json(to_send);               
            console.log("Response sent", "\n-end-");
        } catch (err) {
            res.json(err);
            next(err);
        }
    }
});

export default router;
