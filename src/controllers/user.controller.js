import {asyncHandler} from "../utils/asyncHandler.js"

const registerUser = asyncHandler(async(req,res)=>{
    // Steps to register user
    // 1 get data from body
    // 2 validate data is not empty
    // 3 check email is already register or not
    // 4 Save user into DB
    res.status(200).json({
        success:true,
        message:"Register successfully"
    })
    console.log("Register User");
    
})

export {registerUser};