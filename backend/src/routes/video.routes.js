import { Router } from "express";
import {
    getAllVideos,
    getVideoById,
    publishAVideo,
    togglePublishStatus,
    updateVideo,
    deleteVideo,
} from "../controllers/video.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();
router.use(verifyToken); // Apply verifyJWT middleware to all routes in this file

router
    .route("/")
    .get(getAllVideos)
    .post(
        upload.fields([
            {
                name: "videoFile",
                maxCount: 1,
            },
            {
                name: "thumbnail",
                maxCount: 1,
            },
        ]),
        publishAVideo
    );

router.route("/:videoId").get(getVideoById).delete(deleteVideo).patch(
    upload.fields([
      { name: "thumbnail", maxCount: 1 },
      { name: "videoFile", maxCount: 1 },
    ]),
    updateVideo
  );

router.route("/toggle/publish/:videoId").patch(togglePublishStatus);

export default router
