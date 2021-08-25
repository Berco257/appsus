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
        <h1>notes</h1>
        {this.props.notes.map(note => <NotePreview key={note.id} note={note}/>)}
      </div>
    )
  }

}