import mongoose, { Schema } from "mongoose";

const tweetSchema = new Schema({
    content:{
        type:String,
        trim:true ,
        required: [true, 'Content is required'],
        minlength: [3, 'Tweet must be at least 3 characters'],
        maxlength: [280, 'Tweet cannot exceed 280 characters'],
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required: [true, 'Owner is required'],
    }
},{timestamps:true});

export const Tweet = mongoose.model("Tweet", tweetSchema);