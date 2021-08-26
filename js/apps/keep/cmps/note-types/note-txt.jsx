import { NoteDyanmic } from '../note-dynamic.jsx'
export class NoteTxt extends React.Component {
    render() {
        const { note } = this.props
        return (
            <section className="note-txt">
                <NoteDyanmic note={note} />
                <div>
                <button onClick={this.props.onDeleteNote}>Delete</button>
                <button onClick={() => { this.props.onEditNote(note) }}>Edit</button>
                </div>
            </section>
        )
    }
}