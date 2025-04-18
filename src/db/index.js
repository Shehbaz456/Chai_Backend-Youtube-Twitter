import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";
 
const connect_DB = async ()=>{
    try {
    const connectionInstance = await mongoose.connect(`${process.env.Mongo_url}/${DB_NAME}`)
        console.log(`Mongo db connected !! DB host ${connectionInstance.connection.host}`)       
    } catch (err) {
        console.log("MongoDB connection error FAILED ", err)
        process.exit(1);
    }
}

export default connect_DB;