import  express  from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app =express();

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    methods:["GET","HEAD","PUT","PATCH","POST","DELETE"],
    credentials:true,
}))


app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))
app.use(cookieParser())


// Router import
import userRouter from "./routes/user.routes.js";
import tweetRouter from "./routes/tweet.routes.js";
import healthcheckRouter from "./routes/healthcheck.routes.js";
import videoRouter from "./routes/video.routes.js";
import commentRouter from "./routes/comment.routes.js";
import playlistRouter from "./routes/playlist.routes.js";
import likeRouter from "./routes/like.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import dashboardRouter from "./routes/dashboard.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js"; 

// Routers declaration
app.use("/api/v1/healthcheck", healthcheckRouter);
app.use("/api/v1/users",userRouter);
app.use("/api/v1/tweets", tweetRouter);
app.use("/api/v1/videos", videoRouter);
app.use("/api/v1/comments", commentRouter);
app.use("/api/v1/playlist", playlistRouter);
app.use("/api/v1/likes", likeRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);
app.use("/api/v1/dashboard", dashboardRouter);


// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.method} ${req.originalUrl} not found`});
});
app.use(errorHandler);

export { app }