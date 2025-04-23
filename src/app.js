import  express  from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app =express();

app.use(cors({
    origin : process.env.CORS_ORIGIN,
    methods:["GET,HEAD,PUT,PATCH,POST,DELETE"],
    credentials:true,
}))


app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended:true}))
app.use(express.static("public"))
app.use(cookieParser())


// Router import
import userRouter from "./routes/user.routes.js"
import tweetRouter from "./routes/tweet.routes.js"
// Routers declaration
app.use("/api/v1/users",userRouter);
app.use("/api/v1/tweets", tweetRouter);

export { app }
// 13:00 time