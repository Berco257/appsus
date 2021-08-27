import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/storage.service.js'

export const noteService = {
    query,
    saveNote,
    deleteNote,
    pinNotes

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
        }
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
        }
    },
    {
        id: utilService.makeId(),
        type: "note-video",
        header: "Saved Video",
        isPinned: false,
        info: {
            url: "https://www.youtube.com/embed/watch?v=yBQ6Kck_JJc&list=RDyBQ6Kck_JJc&start_radio=1",
            title: "Gal Toren - Angel"
        },
        style: { backgroundColor: "#00d" }
    }
];

_createNotes();

function pinNotes() {
    const newNotesIdx = []
    gNotes.forEach((note, idx) => {
        if (note.isPinned === true) {
            newNotesIdx.push(idx)
        }
    })
    newNotesIdx.forEach(noteIdx => {
        array_move(gNotes, noteIdx)
    })

    console.log(gNotes);
}

function array_move(arr, old_index, new_index) {
    if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing
};

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
    return noteToEdit.id ? _updateNote(noteToEdit) : _addNote(noteToEdit)
}

function _addNote(noteToEdit) {
    var note = _createNote(noteToEdit)
    gNotes.unshift(note)
    _saveNotesToStorage();
    return Promise.resolve()
}

function _updateNote(noteToEdit) {
    debugger;
    var noteIdx = gNotes.findIndex(function(note) {
        return note.id === noteToEdit.id;
    })
    let updatedNote = _createNote(noteToEdit)
    updatedNote.isPinned = noteToEdit.isPinned
    updatedNote.id = noteToEdit.id
    gNotes[noteIdx] = updatedNote
    _saveNotesToStorage();
    return Promise.resolve()
}

function _createNote(note) {
    return {
        id: utilService.makeId(),
        header: note.header,
        type: note.type,
        isPinned: false,
        info: getInfo(note, note.type)
    }
}


function _saveNotesToStorage() {
    storageService.saveToStorage(KEY, gNotes)
}

function getInfo(note, type) {
    if (note.info) return note.info
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
        let todoList = note.todoTxt.split(',')
        let txtAndDates = todoList.map(todo => {
            return { txt: todo, doneAt: Date.now() }
        })
        console.log(txtAndDates);
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