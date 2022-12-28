import { createNote } from "./notes"

const titleElement = document.querySelector('#note-title')
const bodyElement = document.querySelector('#note-body')
const newElement = document.querySelector('#new-note')
const cancelElement = document.querySelector('#cancel')
const noteId = location.hash.substring(1)

newElement.addEventListener('click', () => {
    if (!titleElement.value) {
        alert('Note title could not be empty!')
    } else {
        createNote({ 
            title: titleElement.value,
            body: bodyElement.value
        })
        location.assign('/index.html')
    }
})

cancelElement.addEventListener('click', () => {
    location.assign('/index.html')
})


window.addEventListener('storage', (e) => {
    if (e.key === 'notes') {
        initializeCreatePage(noteId)
    }
})