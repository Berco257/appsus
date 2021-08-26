import { noteService } from '../services/note.service.js';
import { eventBusService } from "../../../services/event-bus-service.js"
export class NoteEdit extends React.Component {
    state = {
        // note: {
        //     id: null, // when edeting, I need to import id when did mount
        //     noteHeader: '',
        //     comment: '',
        //     imgUrl: '',
        //     videoUrl: '',
        //     type: '',
        // }
    }
    // removeEventBus;

    // componentDidMount() {
    //     this.removeEventBus = eventBusService.on('note-edit', (note) => {
    //         this.onEditNote(note);
    //     })
    // }

    // componentWillUnmount() {
    //     this.removeEventBus()
    // }


    // handleChange = ({ target }) => {
    //     debugger;
    //     const field = target.name
    //     const value = target.value
    //     if (field === 'imgUrl') {
    //         this.setState(prevState => ({ note: { ...prevState.note, type: 'note-img' } }))
    //     } else if (field === 'videoUrl') {
    //         this.setState(prevState => ({ note: { ...prevState.note, type: 'note-video' } }))
    //     } else if ((field === 'comment') && ((this.state.note.imgUrl === '') && (this.state.note.videoUrl === ''))) {
    //         this.setState(prevState => ({ note: { ...prevState.note, type: 'note-txt' } }))
    //     }
    //     this.setState(prevState => ({ note: { ...prevState.note, [field]: value } }))
    // }
    onSaveNote = (ev) => {
        ev.preventDefault()
        noteService.saveNote(this.props.note)
            .then(() => this.props.loadNotes())
        debugger;
        this.props.zeroStateNote();
    }

    render() {
        const { id, noteHeader, comment, imgUrl, videoUrl } = this.props.note
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
                <button>Add checkmark list</button>
                <button onSubmit={this.onSaveNote}>Save Note</button>
            </form>
        )
    }
}