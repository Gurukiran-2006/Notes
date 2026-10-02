const {z}=require("zod");

const createNoteSchema=z.object({
    title:z.string().trim().min(1,"Title is Required"),
    content:z.string().optional(),
    tags:z.array(z.string()).optional()
});

const updateNoteSchema=z.object({
    title:z.string().trim().min(1,"Title is Required"),
    content:z.string().optional(),
    tags:z.array(z.string()).optional(),
    isPinned:z.boolean().optional()
});

module.exports={createNoteSchema,updateNoteSchema};