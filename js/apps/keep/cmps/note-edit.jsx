import { noteService } from '../services/note.service.js';
export class NoteEdit extends React.Component {
    state = {
        note: {
            id: null, // when edeting, I need to import id when did mount
            noteHeader: '',
            comment: '',
            imgUrl: '',
            videoUrl: '',
            type: '',
        }
    }
    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        if (field === 'imgUrl' ) {
            this.setState(prevState => ({ note: { ...prevState.note, type: 'note-img' } }))    
        } else if (field === 'videoUrl' ){
            this.setState(prevState => ({ note: { ...prevState.note, type: 'note-video' } }))
        } else if (field === comment && (this.state.note.noteHeader ==='' && this.state.note.videoUrl ==='')){
            this.setState(prevState => ({ note: { ...prevState.note, type: 'note-txt' } }))
        }
        this.setState(prevState => ({ note: { ...prevState.note, [field]: value } }))
    }
    onSaveNote = (ev) => {
        ev.preventDefault()
        noteService.saveNote(this.state.note)
        .then(() => this.props.loadNotes())
        this.zeroStateNote();
    }

    zeroStateNote = ()=>{
        this.setState(prevState => ({ note: { ...prevState.note, id: null } }))
        this.setState(prevState => ({ note: { ...prevState.note, noteHeader: '' } }))
        this.setState(prevState => ({ note: { ...prevState.note, comment: '' } }))
        this.setState(prevState => ({ note: { ...prevState.note, imgUrl: '' } }))
        this.setState(prevState => ({ note: { ...prevState.note, videoUrl: '' } }))
        this.setState(prevState => ({ note: { ...prevState.note, type: '' } }))
    }

    render() {
        const { id,noteHeader, comment, imgUrl, videoUrl } = this.state.note
        return (
            <form className="note-add" onSubmit={this.onSaveNote}>
                <h1>{id ? 'Edit' : 'Add'} Note</h1>
                <label htmlFor="noteHeader" >Header</label>
                <input type="text" name="noteHeader" id="noteHeader" value={noteHeader} onChange={this.handleChange} />
                <label htmlFor="comment" >Comment</label>
                <input type="text" name="comment" id="comment" value={comment} onChange={this.handleChange} />
                <label htmlFor="imgUrl" >Add Image</label>
                <input type="url" name="imgUrl" id="imgUrl" value={imgUrl} onChange={this.handleChange} />
                <label htmlFor="videoUrl" >Add Video</label>
                <input type="url" name="videoUrl" id="videoUrl" value={videoUrl} onChange={this.handleChange} />
                <button>Add checkmark list</button>
                <button onSubmit={this.onSaveNote}>Save Note</button>
            </form>
        )
    }
}