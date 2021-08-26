import { noteService } from '../services/note.service.js';
import {NoteList} from '../cmps/note-list.jsx'
import { NoteEdit } from '../cmps/note-edit.jsx'

export class KeepApp extends React.Component{
    state = {
        notes: [],
        noteEdit: {
            id: null, // when edeting, I need to import id when did mount
            noteHeader: '',
            comment: '',
            imgUrl: '',
            videoUrl: '',
            type: '',
        }
    }
    componentDidMount(){
        this.loadNotes();
    }

    loadNotes = ()=> {
        let notes = noteService.query();
        this.setState({ notes });
    }

    handleChange = ({ target }) => {
        const field = target.name 
        const value = target.value 
        if (field === 'imgUrl') {
            this.setState(prevState => ({ noteEdit: { ...prevState.noteEdit, type: 'note-img' } }))
        } else if (field === 'videoUrl') {
            this.setState(prevState => ({ noteEdit: { ...prevState.noteEdit, type: 'note-video' } }))
        } else if ((field === 'comment') && ((this.state.noteEdit.imgUrl === '') && (this.state.noteEdit.videoUrl === ''))) {
            this.setState(prevState => ({ noteEdit: { ...prevState.noteEdit, type: 'note-txt' } }))
        }
        this.setState(prevState => ({ noteEdit: { ...prevState.noteEdit, [field]: value } }))
    }

    zeroStateNote = () => {
        debugger;
        const emptyNote = {id: null, noteHeader: '', comment: '', imgUrl: '', videoUrl: '', type: ''}
        this.setState({noteEdit:emptyNote})
    }

    onEditNote = (note) => {
            this.setState(prevState => ({ noteEdit: { ...prevState.noteEdit, id: note.id } }))
            this.setState(prevState => ({ noteEdit: { ...prevState.noteEdit, noteHeader: note.header } }))
            this.setState(prevState => ({ noteEdit: { ...prevState.noteEdit, type: note.type } }))
            if (note.type ==='note-txt') {
                this.setState(prevState => ({ noteEdit: { ...prevState.noteEdit, comment: note.info.txt } }))
            }
        }

    render(){
        const {notes} = this.state;
        if (notes.length===0) return <div>loading...</div>
        return(
            <section className="keep-app">
                <h1>Keep app</h1>
                <NoteEdit loadNotes = {this.loadNotes} note={this.state.noteEdit} handleChange={this.handleChange}
                zeroStateNote={this.zeroStateNote}/>
                <NoteList notes={notes} loadNotes = {this.loadNotes} onEditNote={this.onEditNote}/>
            </section>
        )
    }
}