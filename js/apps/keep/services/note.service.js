import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js'

export const noteService = {
    query,
    saveNote,
    deleteNote,
}
const KEY = 'notesDB';
var gNotes;
const gData = [{
        id: utilService.makeId(),
        type: "note-txt",
        header: "What I am doing",
        isPinned: false,
        info: {
            txt: "Fullstack Me Baby!"
        },
    },
    {
        id: utilService.makeId(),
        type: "note-img",
        header: "Great picture!",
        isPinned: true,
        info: {
            url: "https://i.picsum.photos/id/788/200/200.jpg?hmac=ECykjkngzBhLGOjhU-UYPGXXjL8Ba8VPX3S_xid4T-k",
            title: "Bobi and Me"
        },
        style: { backgroundColor: "#00d" }
    },
    {
        id: utilService.makeId(),
        type: "note-todos",
        header: "Things to do",
        isPinned: true,
        info: {
            label: "Get my stuff together",
            todos: [{ txt: "Driving liscence", doneAt: null }, { txt: "Coding power", doneAt: 187111111 }]
        },
    },
    {
        id: utilService.makeId(),
        type: "note-video",
        header: "Saved Video",
        isPinned: false,
        info: {
            url: "https://www.youtube.com/embed/watch?v=yBQ6Kck_JJc&list=RDyBQ6Kck_JJc&start_radio=1",
            title: "Great Music"
        },
    }
];

_createNotes();

function query(filterBy) {
    if (filterBy) {
        const notesToShow = gNotes.filter(note => {
            return note.vendor.includes(vendor) &&
                note.speed >= minSpeed &&
                note.speed <= maxSpeed
        })
        return Promise.resolve(notesToShow)
    }
    return Promise.resolve(gNotes)
}

function saveNote(noteToEdit) {
    return _updateNote(noteToEdit)
}

function _addNote(noteToEdit) {
    var note = _createNote(noteToEdit)
    gNotes.unshift(note)
    _saveNotesToStorage();
    return Promise.resolve()
}

function _updateNote(noteToEdit) {
    var noteIdx = gNotes.findIndex(function(note) {
        return note.id === noteToEdit.id;
    })
    if (noteIdx === -1) _addNote(noteToEdit)
    let updatedNote = {}
    updatedNote.isPinned = noteToEdit.isPinned ? true : false
    updatedNote.id = noteToEdit.id
    updatedNote.header = noteToEdit.header
    updatedNote.style = noteToEdit.style
    updatedNote.type = noteToEdit.type
    updatedNote.info = getInfo(noteToEdit, noteToEdit.type)
    gNotes[noteIdx] = updatedNote
    _saveNotesToStorage();
    return Promise.resolve()
}

function _createNote(note) {
    console.log(note);
    note.id = utilService.makeId()
    note.header = note.header
    note.type = getType(note)
    note.isPinned = false
    note.info = getInfo(note, note.type)
    delete note.comment;
    delete note.noteHeader;
    return note;
}


function _saveNotesToStorage() {
    storageService.saveToStorage(KEY, gNotes)
}

function getType(note) {
    if (note.imgUrl) return 'note-img';
    else if (note.videoUrl) return 'note-video';
    else if (note.todoTxt) return 'note-todos';
    else return 'note-txt';
}

function getInfo(note, type) {
    if (note.info) return note.info
    if (type === 'note-txt') {
        return {
            txt: note.comment
        }
    } else if (type === 'note-img') {
        return {
            url: note.imgUrl,
            title: note.comment
        }
    } else if (type === 'note-video') {
        return {
            url: note.videoUrl,
            title: note.comment
        }
    } else if (type === 'note-todos') {
        let todoList = note.todoTxt.split(',')
        let txtAndDates = todoList.map(todo => {
            return { txt: todo, doneAt: Date.now() }
        })
        return {
            label: note.comment,
            todos: txtAndDates
        }
    }
}

function _createNotes() {
    gNotes = storageService.loadFromStorage(KEY)
    if (!gNotes || !gNotes.length) {
        gNotes = gData;
        _saveNotesToStorage();
    }
}

function deleteNote(noteId) {
    var noteIdx = gNotes.findIndex(function(note) {
        return noteId === note.id
    })
    gNotes.splice(noteIdx, 1)
    _saveNotesToStorage();
    return Promise.resolve()
}