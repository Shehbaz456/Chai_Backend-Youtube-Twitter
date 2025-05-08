import { Router } from 'express';
import {
    getSubscribedChannels,
    getUserChannelSubscribers,
    toggleSubscription,
} from "../controllers/subscription.controller.js"
import {verifyToken} from "../middlewares/auth.middleware.js"

const router = Router();
router.use(verifyToken); 

// Toggle subscription (subscribe/unsubscribe)
router.route("/toggle/:channelId").post(toggleSubscription);

// Get all subscribers of a channel
router.route("/channel/:channelId/subscribers").get(getUserChannelSubscribers);

// Get all channels a user is subscribed to
router.route("/user/:subscriberId/channels").get(getSubscribedChannels);

export default router