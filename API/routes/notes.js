const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note');
const { body, validationResult } = require('express-validator');

var notesValidations = [
    body('title').isLength({ min: 3 }).withMessage('Title must be at least 3 characters long'),
    body('description').isLength({ min: 5}).withMessage('Description must be at least 5 characters long'),
 ];

//ROUTE1: Get all the notes using: GET "/api/auth/createuser". Login required
router.get('/fetchallnotes',fetchuser, async (req,res)=>{
    try {
    const notes = await Note.find({user: req.user.id})
    res.json(notes)
} catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
}
})

//ROUTE2: Add a new note using: POST "/api/notes/addnote". Login required
router.post('/addnote',fetchuser,notesValidations, async (req,res)=>{
    try {
        const{title, description, tag} = req.body;
   // If there are errors ,return bad request and error
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
   }
   const notes = new Note({
    title,description,tag,user: req.user.id
   })
   const savedNote = await notes.save()

    res.json(savedNote)
} catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
}
})

//ROUTE3: Update a new note using: PUT "/api/notes/addnote". Login required
router.put('/updatenote/:id',fetchuser, async (req,res)=>{
    try {
    const{title, description, tag} = req.body;
    // Create a newNote Object
    const newNote = {};
    if (title){newNote.title = title};
    if (description){newNote.description = description};
    if (tag){newNote.tag = tag};

    // Find the note to be updated and update it
    let note =await Note.findById(req.params.id);
    if(!note)
    {return res.status(404).send("Note not found")}

    // Allow updation only if user owns the note
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not allowed/Chla ja b***")
    }
    note = await Note.findByIdAndUpdate(req.params.id,{$set: newNote}, {new:true})
    res.json(note);
} catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
}
})

//ROUTE4: Delete an existing note using: DELETE "/api/notes/deletenote". Login required
router.delete('/deletenote/:id',fetchuser, async (req,res)=>{
    try {
     const{title, description, tag} = req.body;

    // Find the note to be deleted and delete it
    let note =await Note.findById(req.params.id);
    if(!note)
    {return res.status(404).send("Note not found")}

    //Allow deletion only if user owns the note 
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not allowed/Chla ja b***")
    }
    note = await Note.findByIdAndDelete(req.params.id)
    res.json("Success: Note has been deleted");
} catch (error) {
    console.log(error.message);
    res.status(500).send("Internal server error");
}
})
module.exports = router;