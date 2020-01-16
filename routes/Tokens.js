import { Router } from 'express';
import updateToken from '../vasttrafik-requests';

const router = Router();

router.get("/", async (req, res, next) => {
    try {
        console.log("-start-", "\nGenerating token...");
        
        const data = await updateToken();
        res.json(data);
        console.log("Response sent", "\n-end-");

    } catch (err) {
        res.json(err);
        next(err);
    }
});

export default router;