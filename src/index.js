// require('dotenv')
// require('dotenv').config()
import dotenv from "dotenv";
import connect_DB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
  path: "./env",
});

connect_DB()
  .then(() => {
    app.on(error,()=>{
        console.log(error);
        throw error
    });
    
    app.listen(process.env.PORT || 8000, () => {
      console.log("Active connection at Port 8000");
    });
  })
  .catch((err) => console.log("mongoDB Connection failed ", err));



  // import { express } from "express";
// const app = express();
// (async()=>{
//     try {
//        await mongoose.connect(`${process.env.Mongo_url}/${DB_NAME}`);
        // app.on(error,()=>{
        //     console.log(error);
        //     throw error
        // });

//         app.listen(process.env.PORT,()=>{
//             console.log(`Active port no ${process.env.PORT}`)
//         })
//     } catch (error) {
//         console.error("ERROR : " ,error);
//         throw error;
//     }
// })();
