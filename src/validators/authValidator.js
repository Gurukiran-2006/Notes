const {z}=require("zod");

const signupSchema=z.object({
    name:z.string().trim().min(1,"Nmae is Required"),
    email:z.string().trim().email("Invalid email"),
    password:z.string().min(6,"password must be atleast 6 characters long"),
});

const loginSchema=z.object({
    email:z.string().email("Invalid Credentials"),
    password:z.string().min(6,"Invalid Credentials")
});

module.exports={signupSchema,loginSchema};