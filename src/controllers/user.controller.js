import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"

import { User } from "../models/user.model.js"


const registerUser = asyncHandler(async(req,res)=>{
    // Steps to register user
    // 1 get data from body
    // 2 validate data is not empty
    // 3 check email is already register or not
    // 4 Save user into DB

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

        console.log(req.files);
        
        // avatar,coverImage url 
        const avatarLocalpath = req.files?.avatar[0]?.path
        const coverImgLocalpath = req.files?.coverImage[0]?.path
        
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
        new ApiResponse(200,"User Register Successfully")
       )


    } catch (error) {
        
    }

    res.status(200).json({
        success:true,
        message:"Register successfully"
    })
    console.log("Register User");
    
})

export {registerUser};