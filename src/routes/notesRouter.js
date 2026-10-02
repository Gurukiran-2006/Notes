    const express=require("express");

    const router=express.Router();

    const {auth}=require("../middlewares/authMiddleware");

    const {createNotes,getNotes,getNotesById,updateNotes,deleteNote}=require("../controllers/noteController");

    const validate=require("../middlewares/validate");
    
    const {createNoteSchema,updateNoteSchema}=require("../validators/notesValidator");
    
    router.use(auth);

    router.post("/",validate(createNoteSchema),createNotes);
    router.get("/",getNotes);
    router.get("/:id",getNotesById);
    router.patch("/:id",validate(updateNoteSchema),updateNotes);
    router.delete("/:id",deleteNote);

    module.exports=router;