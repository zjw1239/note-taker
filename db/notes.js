// set imports
const fileSystem = require('fs').promises;
const { v1: uuidv1 } = require('uuid');

// retrieve data, return parsed data
class NoteStore {
    async retrieveData() {
        try {
            const data = await fileSystem.readFile('db/db.json', 'utf8');
            return JSON.parse(data) || [];
        } catch (error) {
            return [];
        }
    }

    // save data, update contents of file with new data
    async saveData(notes) {
        try {
            await fileSystem.writeFile('db/db.json', JSON.stringify(notes));
        } catch (error) {
            throw new Error('Error writing to file');
        }
    }


    // retrieve data from storage with "retrieveData" method, checks for array and returns it
    async fetchNotes() {
        try {
            const notes = await this.retrieveData();
            return Array.isArray(notes) ? notes : [];
        } catch (error) {
            return [];
        }
    }


    // create new note
    async createNote(note) {
        const { title, text } = note;
        if (!title || !text) {
            throw new Error("Note 'title' and 'text' cannot be blank");
        }


        const newNote = { title, text, id: uuidv1() };
        const notes = await  this.fetchNotes();
        notes.push(newNote);
        await this.saveData(notes);
        return newNote;
    }


    // delete note
    async delteNote(id) {
        const notes = await this.fetchNotes();
        const updatedNotes = notes.filter((note) => note.id !== id);
        await this.saveData(updatedNotes);
    }
}

module.exports = new NoteStore();
