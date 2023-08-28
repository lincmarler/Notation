import { Note } from "./models/Notes.js"
import { Value } from "./models/Value.js"
import { EventEmitter } from "./utils/EventEmitter.js"
import { isValidProp } from "./utils/isValidProp.js"
import { loadState } from "./utils/Store.js"

class ObservableAppState extends EventEmitter {
  page = ''

  /** @type {import('./models/Value.js').Value[]} */
  values = loadState('values', [Value])

  /** @type {import('./models/Notes.js').Note[]} */
  notes = loadState('notes', [Note])
  // notes = [

  //   new Note({
  //     noteBody: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt molestias officiis similique. Facilis, excepturi possimus?",
  //     noteTitle: 'Monday'
  //   }),
  //   new Note({
  //     noteColor: '',
  //     noteTitle: 'Tuesday',

  //   })
  // ]
  activeNote = null


  // NOTE Used to load initial data
  init() {

  }

}

export const AppState = new Proxy(new ObservableAppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})
