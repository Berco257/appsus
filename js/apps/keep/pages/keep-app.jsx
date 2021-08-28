import { noteService } from '../services/note.service.js';
import { NoteList } from '../cmps/note-list.jsx'
import { NoteEdit } from '../cmps/note-edit.jsx'

export class KeepApp extends React.Component {
    state = {
        notes: [],
        noteEdit: {
            id: null,
            header: '',
            comment: '',
            imgUrl: '',
            videoUrl: '',
            todoTxt: '',
            style: '',
            type: '',

        },
        isEdit: false,
        isNewNote: false,
        filterBy: null
    }
    componentDidMount() {
        this.loadNotes();
    }

    loadNotes = () => {
        noteService.query(this.state.filterBy).then((notes) => {
            this.setState({ notes })
        })
    }

    toggleEditMode = () => {
        this.setState({ isEdit: !this.state.isEdit })
    }

    // handleChange = ({ target }) => {
    //     const field = target.name
    //     const value = target.value
    //     if (field === 'imgUrl') {
    //         this.setState(prevState => ({ noteEdit: { ...prevState.noteEdit, type: 'note-img' } }))
    //     } else if (field === 'videoUrl') {
    //         this.setState(prevState => ({ noteEdit: { ...prevState.noteEdit, type: 'note-video' } }))
    //     } else if (field === 'todoTxt') {
    //         this.setState(prevState => ({ noteEdit: { ...prevState.noteEdit, type: 'note-todos' } }))
    //     } else if ((field === 'comment') && ((this.state.noteEdit.imgUrl === '') && (this.state.noteEdit.videoUrl === '')
    //         && (this.state.noteEdit.todoTxt === ''))) {
    //         this.setState(prevState => ({ noteEdit: { ...prevState.noteEdit, type: 'note-txt' } }))
    //     }
    //     this.setState(prevState => ({ noteEdit: { ...prevState.noteEdit, [field]: value } }))
    // }

    zeroStateNote = () => {
        const emptyNote = { id: '', noteHeader: '', comment: '', imgUrl: '', videoUrl: '', type: '', todoTxt: '' }
        this.setState({ noteEdit: emptyNote })
    }

    onEditNote = (note) => {
        this.zeroStateNote();
        this.setState(prevState => ({
            noteEdit: {
                ...prevState.noteEdit, id: note.id, header: note.header,
                type: note.type, style: note.style, isPinned: note.isPinned
            }
        }))
        if (note.type === 'note-txt') {
            this.setState(prevState => ({ noteEdit: { ...prevState.noteEdit, comment: note.info.txt } }))
        } else if (note.type === 'note-img') {
            this.setState(prevState => ({ noteEdit: { ...prevState.noteEdit, comment: note.info.title } }))
            this.setState(prevState => ({ noteEdit: { ...prevState.noteEdit, imgUrl: note.info.url } }))
        } else if (note.type === 'note-video') {
            this.setState(prevState => ({ noteEdit: { ...prevState.noteEdit, comment: note.info.title } }))
            this.setState(prevState => ({ noteEdit: { ...prevState.noteEdit, videoUrl: note.info.url } }))
        } else if (note.type === 'note-todos') {
            const todotxt = note.info.todos.map(todo => todo.txt)
            this.setState(prevState => ({ noteEdit: { ...prevState.noteEdit, comment: note.info.label } }))
            this.setState(prevState => ({ noteEdit: { ...prevState.noteEdit, todoTxt: todotxt } }))
        }
        this.setState({ isEdit: true })
    }

    onAddNote = () => {
        this.zeroStateNote();
        this.setState(prevState => ({ noteEdit: { ...prevState.noteEdit, id: '1234' } }))
        this.setState({ isEdit: true, isNewNote: true })
    }

render() {
    const { notes, isEdit, isNewNote } = this.state;
    if (notes.length === 0) return <div>loading...</div>
    return (
        <section className="keep-app" >
            <h1>Keep app</h1>
            <button className="add-note-btn" onClick={this.onAddNote}>New Note</button>
            <NoteEdit className="note-edit" loadNotes={this.loadNotes} note={this.state.noteEdit} toggleEditMode={this.toggleEditMode}
                zeroStateNote={this.zeroStateNote} isEdit={isEdit} isNewNote={isNewNote} />
            <NoteList notes={notes} loadNotes={this.loadNotes} onEditNote={this.onEditNote} />
        </section>
    )
}
}