export class NoteImg extends React.Component {
    render() {
        const { note } = this.props
        return (
            <section className="note-txt">
                <h3>{note.header}</h3>
                <h4>{note.info.title}</h4>
                <img src={note.info.url} alt="" />
                <button onClick={this.props.onDeleteNote}>Delete</button>
                <button onClick={() => { this.props.onEditNote(note) }}>Edit</button>
            </section>
        )
    }
}