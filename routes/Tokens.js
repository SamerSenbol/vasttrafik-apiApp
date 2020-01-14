import {Router} from 'express';
import updateToken from '../TokenUpdate';


const router = Router();

router.get("/", async (req, res, next) => {

    try {
        const data = await updateToken();
        res.json(data);

    } catch (err) {
        res.json(err);
        next(err);
    }
});

export default router;