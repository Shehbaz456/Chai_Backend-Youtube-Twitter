import { Router } from "express";
import {
    getAllVideos,
    getVideoById,
    publishAVideo,
    togglePublishStatus,
    updateVideo,
    deleteVideo,
} from "../controllers/video.controller.js";

import {
  getAllVideosSchema,
  publishVideoSchema,
  getVideoByIdSchema,
  updateVideoSchema,
  deleteVideoSchema,
  togglePublishStatusSchema,
} from "../validators/video.validator.js";

import { verifyToken } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import { validate } from "../middlewares/validate.middleware.js"

const router = Router();
router.use(verifyToken); // Apply verifyJWT middleware to all routes in this file

router
    .route("/")
    .get(validate(getAllVideosSchema),getAllVideos)
    .post(
        upload.fields([
            { name: "videoFile", maxCount: 1},
            { name: "thumbnail",  maxCount: 1},
        ]),
        validate(publishVideoSchema),
        publishAVideo
    );

router.route("/:videoId")
    .get(validate(getVideoByIdSchema),getVideoById)
    .delete(validate(deleteVideoSchema),deleteVideo)
    .patch(
        upload.fields([
        { name: "thumbnail", maxCount: 1 },
        { name: "videoFile", maxCount: 1 },
        ]),
        validate(updateVideoSchema),
        updateVideo
    );

router.route("/toggle/publish/:videoId")
    .patch(validate(togglePublishStatusSchema),togglePublishStatus);

export default router
