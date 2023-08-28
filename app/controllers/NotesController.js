import { AppState } from "../AppState.js";
import { Note } from "../models/Notes.js";
import { setHTML } from "../utils/Writer.js";
import { getFormData } from "../utils/FormHandler.js";
import { notesService } from "../services/NotesService.js";
import { Pop } from "../utils/Pop.js";

function _drawNotes() {
    console.log('drawing notes')
    let notes = AppState.notes
    let content = ''
    notes.forEach(noteObj => content += noteObj.ListTemplate)
    setHTML('notesList', content)
}

function _drawActive() {
    let active = AppState.activeNote
    setHTML('activeNote', active.ActiveTemplate)
    console.log('drawing active', active)
}

function _drawTotal() {
    let totalNotes = AppState.notes.length
    setHTML('totalNotes', totalNotes)
    console.log(totalNotes, "totalling")
}



// function _drawForm() {
//     let active = AppState.activeNote
//     setHTML('activeNote', active.FormTemplate)
// }


export class NotesController {
    constructor() {
        _drawNotes()
        _drawTotal()
        console.log('hello from controller')
        AppState.on('notes', _drawNotes)
    }




    setActive(noteId) {
        notesService.setActive(noteId)
        _drawActive()
    }

    saveNote() {
        window.event.preventDefault()
        const form = window.event.target
        let textAreaElem = document.querySelector('textarea')
        let updatedBody = textAreaElem.value
        notesService.saveNote(updatedBody)
    }



    createNote() {
        // debugger

        window.event.preventDefault()
        const form = window.event.target
        const formData = getFormData(form)
        notesService.createNote(formData)
        // _drawActive()
        // _drawForm()
        _drawTotal()
        console.log('creating note', AppState.notes)



    }

    async deleteNote(noteId) {

        if (await Pop.confirm("Are you sure yo uwant to delete this note?")) {
            console.log('deleting', noteId)
            notesService.deleteNote(noteId)
        }
    }
}