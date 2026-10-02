require("dotenv").config();

const express=require("express");
const cors=require("cors");
const connectDB=require("./config/database");

const app=express();
const cookieParser=require("cookie-parser");

const authRouter=require("./routes/authRoutes");

const notesRouter=require("./routes/notesRouter");

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/auth",authRouter);

app.use("/notes",notesRouter);

connectDB()
.then(()=>{
    console.log("database connection establised successfully");
    app.listen(process.env.PORT||5000,()=>
    console.log("server is running")
);
})
.catch((err)=>
console.log("unable to connect to database "+err.message))