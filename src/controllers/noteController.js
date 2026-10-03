const Note=require("../models/notes");

const createNotes=async(req,res)=>{
    try{
     const {title,content,tags}=req.body;
     if(!title){
        return res.status(400).json({
            message:"title is Required"
        });
     }

     const note=await Note.create({
        title,
        content,
        tags,
        user:req.user.id
     });

     res.status(201).json({note});
    }
    catch(err){
        res.status(500).json({
            message:err.message
        });
    }
}

const getNotes=async(req,res)=>{
    try{
        const {search,tags}=req.query;
        const filter={ user:req.user.id};

        if(tags){
            filter.tag=tags;
        }
        if(search){
            const escaped=search.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");

            filter.$or=[
                {title:{$regex:escaped, $options:"i"}},
                {content:{$regex:escaped, $options:"i"}},
            ];
        }

       const notes=await Note.find({user:req.user.id}).sort({
        isPinned:-1,
        createdAt:-1
       });
       res.json(notes);
    }
    catch(err){
        res.status(500).json({
            message:err.message
        });
    }
}

const getNotesById=async (req,res)=>{
    try{
      const note=await Note.findOne({
        _id:req.params.id,
        user:req.user.id,
      });

      if(!note){
        return res.status(404).json({
            message:"User not Found"
        });
      }

      res.json({note});
    }
    catch(err){
        res.status(500).json({
            message:err.message
        });
    }
}

const updateNotes=async(req,res)=>{
    try{
       const {title,content,tags,isPinned}=req.body;
       if(title!==undefined && !title.trim()){
        return res.status(404).json({
            message:"title cannot be empty"
        });
       }
       const note=await Note.findOneAndUpdate(
        {
        _id:req.params.id,
        user:req.user.id,
       },

       {
        title,
        content,
        tags,
        isPinned
       },

       { 
        returnDocument:"after",
        runValidator:true
       }
    );

    if(!note){
        return res.status(404).json({
            message:"Note not Found"
        });
    }

    res.json({note});
    }
    catch(err){
        res.status(500).json({
            message:err.message
        });
    }
}

const deleteNote=async(req,res)=>{
    try{
     const note=await Note.findOneAndDelete({
        _id:req.params.id,
        user:req.user.id
     });
     if(!note){
        return res.status(404).json({
            message:"Note not Found"
        });
     }
     res.json({
        message:"Note deleted successfully"
     });

    }
    catch(err){
        res.status(500).json({
            message:err.message
        });
    }
}

module.exports={createNotes,getNotes,getNotesById,updateNotes,deleteNote};