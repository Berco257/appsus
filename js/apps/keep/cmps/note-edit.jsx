import { noteService } from '../services/note.service.js';
export class NoteEdit extends React.Component {

    onSaveNote = (ev) => {
        ev.preventDefault()
        noteService.saveNote(this.props.note)
            .then(() => this.props.loadNotes())
        this.props.zeroStateNote();
    }

    formatArea = () => {
        return String.fromCharCode(9745);
    }

    render() {
        const { id, noteHeader, comment, imgUrl, videoUrl, todoTxt } = this.props.note
        return (
            <form className="note-add" onSubmit={this.onSaveNote}>
                <h1>{id ? 'Edit' : 'Add'} Note</h1>
                <label htmlFor="noteHeader" >Header</label>
                <input type="text" name="noteHeader" id="noteHeader" value={noteHeader} onChange={(ev) => { this.props.handleChange(ev) }} />
                <label htmlFor="comment" >Comment</label>
                <input type="text" name="comment" id="comment" value={comment} onChange={(ev) => { this.props.handleChange(ev) }} />
                <label htmlFor="imgUrl" >Add Image</label>
                <input type="url" name="imgUrl" id="imgUrl" value={imgUrl} onChange={(ev) => { this.props.handleChange(ev) }} />
                <label htmlFor="videoUrl" >Add Video</label>
                <input type="url" name="videoUrl" id="videoUrl" value={videoUrl} onChange={(ev) => { this.props.handleChange(ev) }} />
                <label htmlFor="videoUrl" >{this.formatArea()}</label>
                <input name="todoTxt" type="text" placeholder="Enter comma seperated list..." value={todoTxt} onChange={(ev) => { this.props.handleChange(ev) }} />
                <button onSubmit={this.onSaveNote}>Save Note</button>
            </form>
        )
    }
}