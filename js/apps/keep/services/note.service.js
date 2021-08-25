import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js'

export const noteService = {
    query,
    saveNote
}
const KEY = 'notesDB';
var gNotes;
const gData = [{
        id: utilService.makeId(),
        type: "note-txt",
        header: "What I am doing",
        isPinned: true,
        info: {
            txt: "Fullstack Me Baby!"
        }
    },
    {
        id: utilService.makeId(),
        type: "note-img",
        header: "Great picture!",
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
        info: {
            label: "Get my stuff together",
            todos: [{ txt: "Driving liscence", doneAt: null }, { txt: "Coding power", doneAt: 187111111 }]
        }
    },
    {
        id: utilService.makeId(),
        header: "Saved Video",
        type: "note-video",
        info: {
            url: "https://www.youtube.com/embed/watch?v=yBQ6Kck_JJc&list=RDyBQ6Kck_JJc&start_radio=1",
            title: "Gal Toren - Angel"
        },
        style: { backgroundColor: "#00d" }
    }
];

_createNotes();

function query() {
    return gNotes;
}

function saveNote(noteToEdit) {
    return noteToEdit.id ? _updateNote(noteToEdit) : _addNote(noteToEdit)
}

function _addNote(noteToEdit) {
    var note = _createNote(noteToEdit)
    gNotes.unshift(note)
    _saveNotesToStorage();
    return Promise.resolve()
}

function _createNote(note) {
    console.log(note);
    return {
        id: utilService.makeId(),
        header: note.noteHeader,
        type: note.type,
        isPinned: false,
        info: getInfo(note, note.type)
    }
}

function _saveNotesToStorage() {
    storageService.saveToStorage(KEY, gNotes)
}

function getInfo(note, type) {
    if (type === 'note-txt') {
        return {
            txt: note.comment
        }
    } else if (type === 'note-img' || type === 'note-video') {
        return {
            url: note.imgUrl,
            title: note.comment
        }
    } else if (type === 'note-todos') {
        return {
            label: 'bla',
            todos: ['bla']
        }
    }
}

function _createNotes() {
    gNotes = storageService.loadFromStorage(KEY)
    if (!gNotes || !gNotes.length) {
        console.log(gNotes);
        gNotes = gData;
        _saveNotesToStorage();
    }
}