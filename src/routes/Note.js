const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

router.get('/list/:userid', async (req, res) => {
    let notes = await Note.find({ userid: req.params.userid });
    res.json(notes);
});

router.post('/add', async (req, res) => {
    const newNote = new Note({
        id: req.body.id,
        userid: req.body.userid,
        title: req.body.title,
        content: req.body.content,
    });
    await newNote.save();
    const response = {
        message: `New Note Created with id: ${req.body.id}`,
    };
    res.json(response);
});

router.put('/update', async (req, res) => {
    let updatedNote = await Note.findOneAndUpdate(
        { id: req.body.id }, // condition
        {
            title: req.body.title,
            content: req.body.content,
        },
        { new: true } // return the updated data
    );
    const response = {
        message: `Note has been updated with id: ${req.body.id}`,
        note: updatedNote,
    };
    res.json(response);
});

router.delete('/delete', async (req, res) => {
    let deletedNote = await Note.deleteOne({ id: req.body.id });
    let response = {
        message: `Note has been deleted with id: ${req.body.id}`,
        note: deletedNote,
    };
    res.json(response);
});

module.exports = router;
