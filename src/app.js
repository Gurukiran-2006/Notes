require("dotenv").config();

const express=require("express");
const cors=require("cors");
const connectDB=require("./config/database");

const app=express();

app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("api is running successfully");
});

connectDB()
.then(()=>{
    console.log("database connection establised successfully");
    app.listen(process.env.port||5000,()=>
    console.log("server is running")
);
})
.catch((err)=>
console.log("unable to connect to database "+err.message))