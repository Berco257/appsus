import { NoteDyanmic } from '../note-dynamic.jsx'
import { noteService } from '../services/note.service.js';

export class NoteTxt extends React.Component {
    
    render() {
        const { note } = this.props
        return (
            <section className="note-txt">
                <NoteDyanmic note={note} loadNotes={this.props.loadNotes}/>
            </section>
        )
    }
}