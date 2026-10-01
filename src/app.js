require("dotenv").config();

const express=require("express");
const cors=require("cors");
const connectDB=require("./config/database");

const app=express();

const authRouter=require("./routes/authRoutes");

app.use(cors());
app.use(express.json());

app.use("/auth",authRouter);

connectDB()
.then(()=>{
    console.log("database connection establised successfully");
    app.listen(process.env.PORT||5000,()=>
    console.log("server is running")
);
})
.catch((err)=>
console.log("unable to connect to database "+err.message))