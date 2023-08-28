import { AboutController } from "./controllers/AboutController.js";
import { NotesController } from "./controllers/NotesController.js";
import { HomeController } from "./controllers/HomeController.js";
import { ValuesController } from "./controllers/ValuesController.js";
import { AboutView } from "./views/AboutView.js";


export const router = [
  {
    path: '',
    controller: NotesController,
    view: /*hmtl*/ `
   <section class="row">
  <div class="col-4">
    <div>
      <h3>Notes: <span id="totalNotes">0</span></h3>
    </div>
    <div id="notesList"></div>

    <form onsubmit="app.NotesController.createNote()">
      <div class="col-7 p-5">
        <div class="row">
          <div>
            <div class="form-floating mb-3 col-12">
              <input required type="text" minLength="4" maxLength="10" class"form-control" id="noteTitle" name="noteTitle"
                placeholder="Note Title">
              
            </div>
            <div class="form-floating mb-3 col-12">
              <input required type="color" class="form-control" id="noteColor" name="noteColor" placeholder="Note Color" >
              <label for="noteColor">Note Color</label>
            </div>
          </div>
        </div>
        <div>Creat Note
          <button type="submit"><i class="mdi mdi-plus"></i>add</button>
        </div>
      </div>
    </form>
  </div>
  <div class="col-8" id="activeNote">
</section>
    `
  },
  {
    path: '#/about',
    controller: [AboutController, ValuesController],
    view: AboutView
  }
]