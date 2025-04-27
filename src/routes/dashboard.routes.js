import { Router } from 'express';
import {
    getChannelStats,
    getChannelVideos,
} from "../controllers/dashboard.controller.js"
import {verifyToken} from "../middlewares/auth.middleware.js"

const router = Router();

router.use(verifyToken); // Apply verifyToken middleware to all routes in this file

router.route("/stats").get(getChannelStats);
router.route("/videos").get(getChannelVideos);

export default router