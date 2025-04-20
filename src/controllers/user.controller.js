import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"

import { User } from "../models/user.model.js"


const registerUser = asyncHandler(async(req,res)=>{
    
    // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res

    const {username,email,fullName,password} = req.body

    if([username,email,fullName,password].some((field)=>{
        field?.trim() === ""
    })){
        throw new ApiError(400,"All filed are required");
    }
    
    try {
        const existedUser = await User.findOne({$or:[{ username }, { email } ]})
        
        if(existedUser){
            throw new ApiError(409,"User with email or username already exists");
        }
        
        // avatar,coverImage url 
        const avatarLocalpath = req.files?.avatar[0]?.path
        // const coverImgLocalpath = req.files?.coverImage[0]?.path
        
        let coverImgLocalpath;
        if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length>0 ){
            coverImgLocalpath = req.files.coverImage[0].path
        }


        if(!avatarLocalpath){
            throw new ApiError(400,"Avatar file is required");
        }

        // upload into cloudinary
        const avatar = await uploadOnCloudinary(avatarLocalpath);
        const coverImage = await uploadOnCloudinary(coverImgLocalpath);

        if(!avatar){
            throw new ApiError(400,"Avatar file is required");
        }

        const user = await User.create({
            fullName,
            avatar:avatar.url,
            coverImage:coverImage?.url || "" ,
            email,
            password,
            username,
        })

       const createdUser  = await User.findById(user._id).select("-password -refreshToken");
       if(!createdUser){
        throw new ApiError(500,"somthing went wrong while registeringthe user")
       }

      return res.status(201).json(
        new ApiResponse(200,createdUser,"User Register Successfully")
       )


    } catch (error) {
        
    }
  
})

export {registerUser};