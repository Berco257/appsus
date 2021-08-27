import { noteService } from '../../services/note.service.js';
import { NoteDyanmicImg } from '../dynamic-cmps/note-dynamic-img.jsx';

export class NoteImg extends React.Component {

    onPinNote = () => {
        this.props.note.isPinned = !this.props.note.isPinned;
        noteService.saveNote(this.props.note)
            .then(() => this.props.loadNotes())
    }
    changePinSymbol() {
        const iconStyle = { color: 'grey' }
        if (this.props.note.isPinned) {
            return <i className="fas fa-thumbtack"></i>
        } else return <i className="fas fa-thumbtack" style={iconStyle} ></i>
    }

    render() {
        const { note } = this.props
        return (
            <section className="note-txt">
                <NoteDyanmicImg note={note} loadNotes={this.props.loadNotes} onEditNote ={this.props.onEditNote} onDeleteNote={this.props.onDeleteNote}/>
            </section>
        )
    }
}