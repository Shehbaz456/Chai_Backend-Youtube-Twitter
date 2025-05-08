import mongoose from "mongoose";
 
const connect_DB = async ()=>{
    try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log(`Mongo db connected !! DB host ${connectionInstance.connection.host}`)       
    } catch (err) {
        console.log("MongoDB connection error FAILED ", err)
        process.exit(1);
    }
}

export default connect_DB;