const express=require("express");
const Router=express.Router();
const {signup,login,logout}=require("../controllers/authController");

Router.post("/signup",signup);
Router.post("/login",login);
Router.post("/logout",logout);

// const {auth}=require("../middlewares/authMiddleware");
// Router.get("/me",auth,(req,res)=>{
//     res.json({id:req.user._id});
// });

module.exports=Router;