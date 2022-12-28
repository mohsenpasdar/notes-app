import { initializeEditPage, generateLastEdited } from "./views"
import { updateNote, removeNote } from "./notes"

const titleElement = document.querySelector('#note-title')
const bodyElement = document.querySelector('#note-body')
const editElement = document.querySelector('#edit-note')
const removeElement = document.querySelector('#remove-note')
const notesElement = document.querySelector('#notes')
const dateElement = document.querySelector('#last-edited')
const noteId = location.hash.substring(1)

const note = initializeEditPage(noteId)

editElement.addEventListener('click', () => {
    if (!titleElement.value) {
        alert('Note title could not be empty!')
    } else if (titleElement.value != note.title || bodyElement.value != note.body) {
        const newNote = updateNote(noteId, {
            title: titleElement.value,
            body: bodyElement.value
        })
        dateElement.textContent = generateLastEdited(newNote.updatedAt)
        location.assign('/index.html')
    } else {
        console.log('else');
        location.assign('/index.html')
    }
})

removeElement.addEventListener('click', () => {
    removeNote(noteId)
    location.assign('/index.html')
})

notesElement.addEventListener('click', () => {
    location.assign('/index.html')
})

window.addEventListener('storage', (e) => {
    if (e.key === 'notes') {
        initializeEditPage(noteId)
    }
})