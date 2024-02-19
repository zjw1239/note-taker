const express = require('express');
const router = express.Router();
const noteStorage = require('../db/notes');


// get notes from database
router.get('/notes', (req, res) => {
    noteStorage
        .retrieveNotes()
        .then((notes) => {
            return res.json(notes);
        })
        .catch((error) => res.status(500).json(error));
});

// make new note
router.post('/notes', (req, res) => {
    noteStorage
        .saveNewNote(req.body)
        .then((newNote) => res.json(newNote))
        .catch((error) => res.status(500).json(error));
});

// delete note/ notes
router.delete('/notes/:id', (req, res) => {
    noteStorage
        .eraseNoteById(req.params.id)
        .then(() => res.json({ success: true }))
        .catch((error) => res.status(500).json(error));
});

module.exports = router;