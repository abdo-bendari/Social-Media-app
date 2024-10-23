import AppError from "../../../utils/Error.js"
import catchError from "../../../middleware/catchError.js"
import User from "../../../../database/models/User.js"


export const updateUser =catchError(async(req,res,next)=>{
    const user = await User.findByIdAndUpdate(
        req.user._id,
        req.body,
        { new: true }
    );
    if (!user) {
        return next(new AppError('user not found', 404));
    }
    res.status(201).json({ message: 'done', user });
})

export const deleteUser =catchError(async(req,res,next)=>{
    const user = await User.findByIdAndDelete(req.params.id)
    return !user?
    next(new AppError('not found user',404)) :
    res.status(201).json({message :'done',user})
})

export const allUsers = catchError(async(req,res,next)=>{
    const users = (await User.find())
    return users.length == 0 ?
    next(new AppError('not found users',404)) :
    res.status(201).json({message :'done',users})
})

export const getUser = catchError(async(req,res,next)=>{
    const user = await User.findById(req.params.id).select('-password -role').populate('posts')
    if(!user){
     return next(new AppError('not found user',404))
    }
     return res.status(201).json({message :'done',user })
})

export const follow = catchError(async(req,res,next)=>{
    const currentUser = await User.findById(req.user._id)
    const user = await User.findById(req.params.id)
    if(!user || !currentUser){
        return next(new AppError('not found user',404))
    }
    if(currentUser.following.includes(req.params.id)){
        return next(new AppError('you already following this user',404))
    }
    await user.updateOne({$push : {followers : req.user._id}})
    await currentUser.updateOne({$push : {following : req.params.id}})
     return res.status(201).json({message :'done' })
})

export const unFollow = catchError(async(req,res,next)=>{
    const currentUser = await User.findById(req.user._id)
    const user = await User.findById(req.params.id)
    if(!user || !currentUser){
        return next(new AppError('not found user',404))
    }
    if(currentUser.following.includes(req.params.id)){
        await user.updateOne({$pull : {followers : req.user._id}})
        await currentUser.updateOne({$pull : {following : req.params.id}})
         return res.status(201).json({message :'done'})
    }
    return next(new AppError('You are not really following him',404))
})