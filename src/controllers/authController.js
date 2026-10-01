const bcrypt=require("bcrypt");
const User=require("../models/user");
const jwt=require("jsonwebtoken");

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

const login=async(req,res)=>{
    try{
     const {email,password}=req.body;

     if(!email || !password){
        return res.status(400).json({
           message:"All Fields are Required" 
        });
     }

     const user=await User.findOne({email});
     if(!user){
        return res.status(401).json({
            message:"User not exists"
        });
     }

     const isMatch=await bcrypt.compare(password,user.password);
     if(!isMatch){
       return res.status(401).json({
        message:"Invalid Credentials"
       });
     }

     const token=jwt.sign(
        {id:user._id,},
        process.env.JWT_SECRET,
        {expiresIn:"7d"}
     );

     res.cookie("token",token);

     res.json({
        message:"Login successfull",
        token,
        user:{
            id:user._id,
            name:user.name,
            email:user.email
        }
     });

    }
    catch(err){
        res.status(500).json({
            message:err.message
        });
    }
};

const logout=(req,res)=>{
    res.cookie("token",null,
        {
            expiresIn:new Date(Date.now())
        });
        res.send("logout successfull");
}
module.exports={signup,login,logout};