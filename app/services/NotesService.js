import { AppState } from "../AppState.js";
import { saveState } from "../utils/Store.js";
import { Note } from "../models/Notes.js";
import { setHTML } from "../utils/Writer.js";
import { NotesController } from "../controllers/NotesController.js";


function _saveNotes() {
    saveState('notes', AppState.notes)
}

function _drawTotal() {
    let totalNotes = AppState.notes.length
    setHTML('totalNotes', totalNotes)
    console.log(totalNotes, "totalling")
}





class NotesService {
    deleteNote(noteId) {
        let foundNote = AppState.notes.find(note => note.id == noteId)
        let filteredNoteArr = AppState.notes.filter(note => note.id != noteId)
        AppState.notes = filteredNoteArr
        _saveNotes()
        _drawTotal()
    }

    createNote(formData) {
        let newNote = new Note(formData)
        AppState.notes.push(newNote)
        AppState.emit('notes')
        console.log('Note Saved', AppState.notes)
        _drawTotal()
        _saveNotes()
    }

    setActive(noteId) {
        console.log(noteId)
        let foundNote = AppState.notes.find(note => note.id == noteId)
        AppState.activeNote = foundNote
    }

    saveNote(updatedBody) {
        let active = AppState.activeNote
        active.noteBody = updatedBody
        AppState.emit('activeCase')
        // active.
        _saveNotes()
    }
}

export const notesService = new NotesService()