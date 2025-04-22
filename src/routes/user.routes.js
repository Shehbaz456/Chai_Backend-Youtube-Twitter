import { Router } from "express";
const router = Router();
import { loginUser, logoutUser, registerUser,refreshAccessToken,changeCurrentPassword,getCurrentUser,updateAccountDetails,updateUserCoverImage ,updateUserAvatar} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

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
  registerUser
);


router.post("/login",loginUser);
router.post("/refresh-token",refreshAccessToken);

// Protected Routes
router.post("/logout",verifyToken,logoutUser);
router.post("/change-password",verifyToken,changeCurrentPassword);

router.get("/current-user",verifyToken,getCurrentUser);

router.patch("/update-account",verifyToken,updateAccountDetails);

router.patch("/avatar",verifyToken,upload.single("avatar"),updateUserAvatar);
router.patch("/cover-image",verifyToken,upload.single("coverImage"),updateUserCoverImage);


export default router;
