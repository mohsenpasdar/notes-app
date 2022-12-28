import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'

let notes = []

//Read existing notes from localStorage
const loadNotes = () => {
    const notesJSON = localStorage.getItem('notes')

    try {
        notes =  notesJSON ? JSON.parse(notesJSON) : []
    } catch (e) {
        notes = []
    }  
}

// Save the notes to localStorage
const saveNotes = () => {
    localStorage.setItem('notes', JSON.stringify(notes))
} 

// Expose notes from module
const getNotes = () => notes

const createNote = ({ title, body }) => {
    const id = uuidv4()
    const timeStamp = moment().valueOf()
    notes.push({
        id,
        title,
        body,
        createdAt: timeStamp, 
        updatedAt: timeStamp
    })
    saveNotes()
}

// Remove a note from the list
const removeNote = (id) => {
    const noteIndex = notes.findIndex(note => note.id === id)
    if (noteIndex > -1) {
        notes.splice(noteIndex, 1)
        saveNotes()
    }
}

// Sort your notes by one of three ways
const sortNotes = (sortBy) => {
    if (sortBy === 'byEdited') {
        return notes.sort((a, b) => b.updatedAt - a.updatedAt)
    } else if (sortBy === 'byCreated') {
        return notes.sort((a, b) => b.createdAt - a.createdAt)
    } else if (sortBy === 'alphabetical') {
        return notes.sort((a, b) => {
            if (a.title.toLowerCase() < b.title.toLowerCase()) {
                return -1
            } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
                return 1
            } else {
                return 0
            }
        })
    }
}

const updateNote = (id, updates) => {
    const note = notes.find(note => note.id === id)

    if (!note) {
        return
    }

    if (typeof updates.title === 'string') {
        note.title = updates.title
        note.updatedAt = moment().valueOf()
    }

    if (typeof updates.body === 'string') {
        note.body = updates.body
        note.updatedAt = moment().valueOf()
    }

    saveNotes()
    return note
}

loadNotes()

export { getNotes, createNote, removeNote, sortNotes, updateNote, saveNotes, loadNotes }