export class NoteVideo extends React.Component {
    render() {
        const { note } = this.props
        return (
            <section className="note-txt">
                <h3>{note.header}</h3>
                <h4>{note.info.title}</h4>
                <iframe width="250" height="187" src={note.info.url}>
                </iframe>
                <button onClick={this.onDeleteNote}>Delete</button>
                <button onClick={() => { this.props.onEditNote(note) }}>Edit</button>
            </section>
        )
    }
}