import { noteService } from '../services/note.service.js';

export class NoteImg extends React.Component {

    onPinNote = () => { 
        this.props.note.isPinned =  !this.props.note.isPinned;
        noteService.saveNote(this.props.note)
            .then(() => this.props.loadNotes())
    }
    changePinSymbol(){
        const iconStyle = {color: 'grey'}
        if (this.props.note.isPinned){
            return <i className="fas fa-thumbtack"></i>
        } else return <i className="fas fa-thumbtack" style ={iconStyle} ></i>
    }

    render() {
        const { note } = this.props
        return (
            <section className="note-txt">
                <h3>{note.header}</h3>
                <h4>{note.info.title}</h4>
                <img src={note.info.url} alt="" />
                <div className="btns-container">
                <button onClick={this.props.onDeleteNote}>Delete</button>
                <button onClick={() => { this.props.onEditNote(note) }}>Edit</button>
                <button onClick={this.onPinNote}>{this.changePinSymbol()}</button>
                </div>
            </section>
        )
    }
}