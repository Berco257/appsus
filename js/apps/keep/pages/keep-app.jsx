import { noteService } from '../services/note.service.js';
import { NoteList } from '../cmps/note-list.jsx'
import { NoteEdit } from '../cmps/note-edit.jsx'
import { NoteFilter } from '../cmps/note-filter.jsx'

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
            type: '',
        },
        filterBy: null
        // keepKey:'keep-app',
        // noteEditKey: 'note-edit-cont'
    }
    componentDidMount() {
        this.loadNotes();
    }

    loadNotes = () => {
        noteService.pinNotes();
        noteService.query(this.state.filterBy).then((notes) => {
            this.setState({ notes })
        })
    }

    onSetFilter = (filterBy) => {
        this.setState({ filterBy }, this.loadNotes);
    };

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        console.log(target.value);
        if (field === 'imgUrl') {
            this.setState(prevState => ({ noteEdit: { ...prevState.noteEdit, type: 'note-img' } }))
        } else if (field === 'videoUrl') {
            this.setState(prevState => ({ noteEdit: { ...prevState.noteEdit, type: 'note-video' } }))
        } else if (field === 'todoTxt') {
            this.setState(prevState => ({ noteEdit: { ...prevState.noteEdit, type: 'note-todos' } }))
        } else if ((field === 'comment') && ((this.state.noteEdit.imgUrl === '') && (this.state.noteEdit.videoUrl === '')
            && (this.state.noteEdit.todoTxt === ''))) {
            this.setState(prevState => ({ noteEdit: { ...prevState.noteEdit, type: 'note-txt' } }))
        }
        this.setState(prevState => ({ noteEdit: { ...prevState.noteEdit, [field]: value } }))
    }

    zeroStateNote = () => {
        const emptyNote = { id: null, noteHeader: '', comment: '', imgUrl: '', videoUrl: '', type: '', todoTxt: '' }
        this.setState({ noteEdit: emptyNote })
    }

    onEditNote = (note) => {
        this.zeroStateNote();
        this.setState(prevState => ({ noteEdit: { ...prevState.noteEdit, id: note.id, noteHeader: note.header, type: note.type } }))
        // const noteInfo = noteService.getInfo(note, note.type)
        if (note.type === 'note-txt') {
            this.setState(prevState => ({ noteEdit: { ...prevState.noteEdit, comment: note.info.txt } }))
        } else if (note.type === 'note-img' || note.type === 'note-video') {
            this.setState(prevState => ({ noteEdit: { ...prevState.noteEdit, comment: note.info.title } }))
            this.setState(prevState => ({ noteEdit: { ...prevState.noteEdit, imgUrl: note.info.url } }))
        } else if (note.type === 'note-todos') {
            const todotxt = note.info.todos.map(todo => todo.txt)
            this.setState(prevState => ({ noteEdit: { ...prevState.noteEdit, comment: note.info.label } }))
            this.setState(prevState => ({ noteEdit: { ...prevState.noteEdit, todoTxt: todotxt } }))
        }
    }

    render() {
        const { notes, isFormShown, currView } = this.state;
        if (notes.length === 0) return <div>loading...</div>
        return (
            <section className="keep-app" >
                <h1>Keep app</h1>
                <NoteFilter onSetFilter={this.onSetFilter} />
                <NoteEdit className="note-edit" loadNotes={this.loadNotes} note={this.state.noteEdit} handleChange={this.handleChange}
                    zeroStateNote={this.zeroStateNote} />
                <NoteList notes={notes} loadNotes={this.loadNotes} onEditNote={this.onEditNote} />
            </section>
        )
    }
}