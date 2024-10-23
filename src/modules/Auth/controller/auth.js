import catchError from "../../../middleware/catchError.js"
import AppError from "../../../utils/Error.js"
import User from "../../../../database/models/User.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt" 
import dotenv from "dotenv"
dotenv.config()

export const signUp = catchError(async(req,res,next)=>{
    let user = new User (req.body)
    await user.save()
    const token =jwt.sign({userId:user._id,role:user.role},process.env.JWT_KEY)
    res.status(200).json({message:"done",token,status:200})
})

export const signIn = catchError(async(req,res,next)=>{
    const {email,password}=req.body
    const user = await User.findOne({email : email})
    if(user && bcrypt.compareSync(password,user.password)){
    const token =jwt.sign({userId:user._id,role:user.role},process.env.JWT_KEY)
    return  res.status(200).json({message:"done",token,status:200})
    }
    return next(new AppError('invalid email or password'),400)
})

export const changeUserPassword = catchError(async(req,res,next)=>{
    const user = await User.findOne({email:req.body.email})
    if(user && bcrypt.compareSync(req.body.oldPassword,user.password)){
         req.body.newPassword = await bcrypt.hash(req.body.newPassword,8)
    await User.findOneAndUpdate({email:req.body.email},{ password :req.body.newPassword },{new : true})
    const token =jwt.sign({userId:user._id,role:user.role},process.env.JWT_KEY)
    return res.status(200).json({message:"done",token})
    }
    return  next(new AppError('invalid email or password'),400);
})