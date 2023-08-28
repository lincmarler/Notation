import { NotesController } from "../controllers/NotesController.js";
import { generateId } from "../utils/generateId.js";

export class Note {
    constructor(data) {
        this.id = generateId()
        this.noteBody = data.noteBody || "Notes go here..."
        this.noteDate = data.reportedDate ? Date.parse(data.reportedDate) : new Date()
        this.noteTitle = data.noteTitle
        this.noteColor = data.noteColor
        this.updateTime = null
    }





    get ListTemplate() {
        return ` 
    <section class="row p-2">
<div class="col-10 pt-3 btn btn-success" onclick="app.NotesController.setActive('${this.id}')">${this.noteTitle} 
              <input required type="color"  id="noteColor" name="noteColor" value="${this.noteColor}" disabled> </div>
    <button class="col-2 btn btn-danger" onclick="app.NotesController.deleteNote('${this.id}')"><i class="mdi mdi-delete"></i></button>
</section>
        `
    }

    get ActiveTemplate() {
        return /*html*/ `
       <form onsubmit="app.NotesController.saveNote()">
  <div class="col-7 p-5" id="activeNote">
    <div class="row">
      <div class="col-4">
        <div class="mb-3">
        <h3>${this.noteTitle}</h3>
     
  </div>
        <div>
          <input type="color" value="${this.noteColor}" name ="noteColor" id="noteColor" disabled>
        </div>
      </div>
      <p>${this.ComputeReportedDateView}</p>
      <p>Updated: <span id="totalNotesCount"></span></p>
    </div>
    <div class="col-6">

      <textarea name="noteBody" id="noteBody" cols="130" rows="10"
        class="border border-4 border-black rounded mt-4 shadow" placeholder="Notes here...">${this.noteBody}</textarea>
      <button type="submit" class="btn btn-success shadow">Save Note</button>
    </div>
  </div>
  </div>
</form>`
    }

    get ComputeReportedDateView() {
        let date = this.noteDate
        return date.toLocaleString('en-us', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    }
}

