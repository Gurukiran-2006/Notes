const bcrypt=require("bcrypt");
const User=require("../models/user");

const signup=async(req,res)=>{
    try{
     const {name,email,password}=req.body;

     if(!name || !email || !password){
        return res.status(400).json({
         message:"All Fields are Required"
        });
     }

     const existing=await User.findOne({email});

     if(existing){
        return res.status(409).json({
            message:"User Already Exists"
        });
     }

     const hashedPassword=await bcrypt.hash(password,10);
     const user=await User.create({
        name,
        email,
        password:hashedPassword
     });

     res.status(201).json({
        message:"Signup Successfull",
        user:{
            id:user._id,
            name:user.name,
            email:user.email
        },
     });

    }
    catch(err){
        res.status(500).json({
            message:err.message
        });
    }
}

module.exports={signup};