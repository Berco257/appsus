import { NoteDyanmicTxt } from '../dynamic-cmps/note-dynamic-txt.jsx'

export class NoteTxt extends React.Component {
    
    render() {
        const { note } = this.props
        return (
            <section className="note-txt">
                <NoteDyanmicTxt note={note} loadNotes={this.props.loadNotes} onEditNote ={this.props.onEditNote} onDeleteNote={this.props.onDeleteNote}/>
            </section>
        )
    }
}