import { utilService } from '../../../services/util.service.js'


export const noteService = {
    query,
}

var gNotes = [{
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

function query() {
    return gNotes;
}

function _addNote(noteToEdit) {
    var note = _createCar(noteToEdit.vendor, noteToEdit.speed)
    gNotes.unshift(note)
        // _saveCarsToStorage();
    return Promise.resolve()
}

function _createNote(vendor, speed) {
    if (!speed) speed = utilService.getRandomIntInclusive(1, 200)
    return {
        id: utilService.makeId(),
        vendor,
        speed,
        desc: utilService.makeLorem(),
        ctg: ''
    }
}