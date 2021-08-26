import { NoteTxt } from './note-types/note-txt.jsx'
import { NoteImg } from './note-types/note-img.jsx'
import { NoteVideo } from './note-types/note-video.jsx'
import { NoteTodos } from './note-types/note-todos.jsx'
import { noteService } from '../services/note.service.js'

export class NotePreview extends React.Component {
    state = {
        infoType: null,
    }

    onChangeInputType = ({ target }) => {
        this.setState({ inputType: target.value })
    }

    onChangeStyle = (field, value) => {
        this.setState(prevState => ({ footerStyle: { ...prevState.footerStyle, [field]: value } }))
    }

    onDeleteNote = () => {
        noteService.deleteNote(this.props.note.id)
            .then(this.props.loadNotes())
    }

    render() {
        const { note } = this.props
        const { type } = note
        if (type === 'note-txt') {
            return (
                <article className="note-preview">
                    <NoteTxt note = {note} onEditNote ={this.props.onEditNote} onDeleteNote={this.onDeleteNote}/>
                </article>
            )
        } else if (type === 'note-img') {
            return (
                <article className="note-preview">
                    <NoteImg note = {note} onEditNote ={this.props.onEditNote} onDeleteNote={this.onDeleteNote}/>
                </article>
            )
        } else if (type === 'note-todos') {
            return (
                <article className="note-todos">
                    <NoteTodos note = {note} onEditNote ={this.props.onEditNote} onDeleteNote={this.onDeleteNote}/>                    
                </article>
            )
        } else if (type === 'note-video') {
            return (
                <article className="note-preview">
                    <NoteVideo note = {note} onEditNote ={this.props.onEditNote} onDeleteNote={this.onDeleteNote}/>
                </article>
            )
        }
    }
}