import { Router } from 'express';
import {
    createTweet,
    deleteTweet,
    getUserTweets,
    updateTweet,
} from "../controllers/tweet.controller.js"
import {
  createTweetSchema,
  getUserTweetsSchema,
  updateTweetSchema,
  deleteTweetSchema,
} from "../validators/tweet.validator.js";

import { verifyToken } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js"

const router = Router();
router.use(verifyToken); // Apply verifyJWT middleware to all routes in this file


router.route("/").post(validate(createTweetSchema),createTweet);
router.route("/user/:userId").get(validate(getUserTweetsSchema),getUserTweets);

router.route("/:tweetId")
.patch(validate(updateTweetSchema),updateTweet)
.delete(validate(deleteTweetSchema),deleteTweet);

export default router;