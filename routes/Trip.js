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

    export default router;
