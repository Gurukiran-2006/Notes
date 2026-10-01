const express=require("express");
const signupRouter=express.Router();
const {signup}=require("../controllers/authController");

signupRouter.post("/signup",signup);

module.exports=signupRouter;