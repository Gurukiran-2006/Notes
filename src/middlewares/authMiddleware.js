const jwt=require("jsonwebtoken");

const auth=(req,res,next)=>{
    try{
     const token=req.cookies.token;

     if(!token){
        return res.status(401).json({
            message:"No token,access Denied"
        });
     }
     const decoded=jwt.verify(token,process.env.JWT_SECRET);

     req.user=({id:decoded.id});

     next();

    }
    catch(err){
        res.status(500).json({
            message:"Invalid or Expired token"
        });
    }
}

module.exports={auth};