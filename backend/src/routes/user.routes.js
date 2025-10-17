import { Router } from "express";
const router = Router();
import {
    loginUser,
    logoutUser,
    registerUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    updateUserCoverImage,
    updateUserAvatar,
    getUserChannelProfile,
    getWatchHistory,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
    registerUserSchema,
    loginUserSchema,
    refreshAccessTokenSchema,
    changePasswordSchema,
    updateAccountSchema,
    updateAvatarSchema,
    updateCoverImageSchema,
    getUserChannelProfileSchema,
    getWatchHistorySchema,
} from "../validators/user.validator.js";

router.post(
    "/register",
    upload.fields([
        {
            name: "avatar",
            maxCount: 1,
        },
        {
            name: "coverImage",
            maxCount: 1,
        },
    ]),
    validate(registerUserSchema),
    registerUser
);

router.post("/login", validate(loginUserSchema), loginUser);
router.post(
    "/refresh-token",
    validate(refreshAccessTokenSchema),
    refreshAccessToken
);

// Protected Routes
router.post("/logout", verifyToken, logoutUser);
router.post(
    "/change-password",
    verifyToken,
    validate(changePasswordSchema),
    changeCurrentPassword
);

router.get("/current-user", verifyToken, getCurrentUser);

router.patch(
    "/update-account",
    verifyToken,
    validate(updateAccountSchema),
    updateAccountDetails
);

router.patch(
    "/avatar",
    verifyToken,
    upload.single("avatar"),
    validate(updateAvatarSchema),
    updateUserAvatar
);
router.patch(
    "/cover-image",
    verifyToken,
    upload.single("coverImage"),
    validate(updateCoverImageSchema),
    updateUserCoverImage
);

router.get(
    "/c/:username",
    verifyToken,
    validate(getUserChannelProfileSchema),
    getUserChannelProfile
);
router.get(
    "/history",
    verifyToken,
    validate(getWatchHistorySchema),
    getWatchHistory
);

export default router;
