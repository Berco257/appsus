import { NotePreview } from '../cmps/note-preview.jsx'
export class NoteList extends React.Component {
  state = {
    inputType: 'color',
    noteStyle: {

    }
  }

  render() {
    return (
      <div className="note-list">
        <h1>notes</h1>
        {this.props.notes.map(note => <NotePreview key={note.id} note={note} loadNotes = {this.props.loadNotes} onEditNote={this.props.onEditNote}/>)}
      </div>
    )
  }

}