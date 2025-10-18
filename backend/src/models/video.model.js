import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema({
    videoFile:{
        type:String,  // cloudinary Url
        required: [true, 'Video file is required'],
        trim: true
    },
    thumbnail:{
        type:String,  // cloudinary Url
        required: [true, 'Thumbnail is required'],
        trim: true
    },
    title:{
        type:String,  
        required: [true, 'Title is required'],
        trim: true,   
    },
    description:{
        type:String,  
        required: [true, 'Description is required'],
        trim: true  
    },
    duration:{
        type:Number,  
        required: [true, 'Duration is required'],
        min: [0, 'Duration cannot be negative']
    },
    views:{
        type:Number,   
        default: 0,
        min: [0, 'Views cannot be negative']
    },
    isPublished:{
        type:Boolean,
        default:true
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required: [true, 'Owner is required'],
    }

},{timestamps:true})


// Need to implement
// Clean up related data when video is deleted Like, Comment,

// videoSchema.post('findOneAndDelete', async function(doc) {
//     if (doc) {
//         try {
//             const Like = mongoose.model('Like');
//             const Comment = mongoose.model('Comment');
            
//             await Promise.all([
//                 Like.deleteMany({ video: doc._id }),
//                 Comment.deleteMany({ video: doc._id })
//             ]);
            
//             console.log(` Cleaned up related data for video: ${doc._id}`);
//         } catch (error) {
//             console.error(` Error cleaning up video data:`, error);
//         }
//     }
// });


videoSchema.plugin(mongooseAggregatePaginate);

export const Video = mongoose.model("Video",videoSchema);