import { noteService } from '../../services/note.service.js'
import { NoteDyanmicTodos } from '../../cmps/dynamic-cmps/note-dynamic-todos.jsx'
export class NoteTodos extends React.Component {
    
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
                <NoteDyanmicTodos note={note} loadNotes={this.props.loadNotes}onEditNote ={this.props.onEditNote} onDeleteNote={this.props.onDeleteNote}/>
            </section>
        )
    }
}