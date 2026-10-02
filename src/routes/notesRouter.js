    const express=require("express");

    const router=express.Router();

    const {auth}=require("../middlewares/authMiddleware");

    const {createNotes,getNotes,getNotesById,updateNotes,deleteNote}=require("../controllers/noteController");
    
    router.use(auth);

    router.post("/",createNotes);
    router.get("/",getNotes);
    router.get("/:id",getNotesById);
    router.patch("/:id",updateNotes);
    router.delete("/:id",deleteNote);

    module.exports=router;