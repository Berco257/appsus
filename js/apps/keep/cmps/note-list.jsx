import {NotePreview} from '../cmps/note-preview.jsx'
export function NoteList({ notes }) {
    return (
      <div className="note-list">
          <h1>notes</h1>
        {notes.map(note => <NotePreview key={note.id} note={note}/>)}
      </div>
    )
  }