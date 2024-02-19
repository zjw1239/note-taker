const path = require('path');
const expressRouter = require('express').Router();

// supplies notes.html
expressRouter.get('../public/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});

// supplies index.html file
expressRouter.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = expressRouter;