import mongoose from "mongoose";
import userModel from "../models/userModel.js";

export const updateController= async (req,res,next)=>{
    const{name, email,location,lastName}=req.body;
    if (!name || !email || !location ||!lastName){
        next("All Fields are required");
    }
    const user = await userModel.findOne({_id:req.user.userId});
    user.name=name;
    user.lastName=lastName;
    user.email=email;
    user.location=location;
    await user.save();

    const token = user.createJWT();
    res.status(200).json({
        success:true,
        message:"Update Successfully",
        user,
        token
    })
}
export const getuserController= async(req,res,next)=>{
    try {
        const user=await userModel.findOne({_id:req.body.user.userId});
        if (!user){
            return res.status(400).json("user Not Found");
        }
        else{
            user.password=undefined;
            data=user;
            res.status(200).send({
                success:true,
                message:"Get user Successfully",
                data,
            })

        }
        
    } catch (error) {
        res.status(400).send({
            success:false,
            message:"Error Occurs",
            error,
        })
        
    }
    

    
}