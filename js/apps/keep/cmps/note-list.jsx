import { NotePinned } from '../cmps/note-pinned.jsx'
import { NotePreview } from '../cmps/note-preview.jsx'
export class NoteList extends React.Component {
  state = {
    inputType: 'color',
    noteStyle: {

    }
  }

  render() {
    console.log(this.props.notes);
    return (
      <div className="note-list">
        <div className="note-pinned-container">
          {this.props.notes.map(note => {
            if (note.isPinned) return <NotePinned key={note.id} note={note} loadNotes={this.props.loadNotes} onEditNote={this.props.onEditNote} />
          })}
        </div>
        <div className="note-preview-container">
          {this.props.notes.map(note => {
            if (!note.isPinned) return <NotePinned key={note.id} note={note} loadNotes={this.props.loadNotes} onEditNote={this.props.onEditNote} />
          })}
        </div>


      </div>

    )
  }

}