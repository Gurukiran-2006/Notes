const express=require("express");
const Router=express.Router();
const {signup,login,logout}=require("../controllers/authController");

const validate=require("../middlewares/validate");

const {signupSchema,loginSchema}=require("../validators/authValidator");

Router.post("/signup",validate(signupSchema),signup);
Router.post("/login",validate(loginSchema),login);
Router.post("/logout",logout);


module.exports=Router;