// require('dotenv')
// require('dotenv').config()
import dotenv from "dotenv"
import  connect_DB  from "./db/index.js"

dotenv.config({
        path: './env'
    })

connect_DB()



// import { express } from "express";
// const app = express();
// (async()=>{
//     try {
//        await mongoose.connect(`${process.env.Mongo_url}/${DB_NAME}`);
//         app.on(error,()=>{
//             console.log(error);
//             throw error
//         });

//         app.listen(process.env.PORT,()=>{
//             console.log(`Active port no ${process.env.PORT}`)
//         })
//     } catch (error) {
//         console.error("ERROR : " ,error);
//         throw error;
//     }
// })(); 