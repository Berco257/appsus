import { noteService } from '../services/note.service.js';
export class NoteEdit extends React.Component {

    onSaveNote = (ev) => {
        ev.preventDefault()
        noteService.saveNote(this.props.note)
            .then(() => this.props.loadNotes())
        this.props.zeroStateNote();
    }

    render() {
        const { id, noteHeader, comment, imgUrl, videoUrl, todoTxt } = this.props.note
        return (
            <form className="note-add" onSubmit={this.onSaveNote}>
                <h1>{id ? 'Edit' : 'Add'} Note</h1>
                <div className="input-header">
                    <label htmlFor="noteHeader" >Header</label>
                    <input type="text" name="noteHeader" id="noteHeader" value={noteHeader} onChange={(ev) => { this.props.handleChange(ev) }} />
                </div>
                <div className="input-comment">
                    <label htmlFor="comment" >Comment</label>
                    <input type="text" name="comment" id="comment" value={comment} onChange={(ev) => { this.props.handleChange(ev) }} />
                </div>
                <label htmlFor="imgUrl" ><i class="far fa-image"></i></label>
                <div className="img-input-cont">
                    <input type="url" name="imgUrl" id="imgUrl" value={imgUrl} onChange={(ev) => { this.props.handleChange(ev) }} />
                </div>
                <label htmlFor="videoUrl" ><i class="fab fa-youtube"></i></label>
                <div className="video-input-cont">
                    <input type="url" name="videoUrl" id="videoUrl" value={videoUrl} onChange={(ev) => { this.props.handleChange(ev) }} />
                </div>
                <label htmlFor="todoTxt" ><i class="far fa-check-square"></i></label>
                <div className="todo-input-cont">
                    <input name="todoTxt" type="text" placeholder="Enter comma seperated list..." value={todoTxt}
                        onChange={(ev) => { this.props.handleChange(ev) }} />
                </div>
                <button onSubmit={this.onSaveNote}>Save Note</button>
            </form>
        )
    }
}