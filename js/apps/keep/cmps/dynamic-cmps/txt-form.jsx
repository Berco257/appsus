import { noteService } from '../../services/note.service.js';

export class TxtForm extends React.Component {
    state = {
        note: {
            id: '',
            header: '',
            comment: '',
            imgUrl: '',
            videoUrl: '',
            todoTxt: '',
            style: '',
            type: '',
        },
    }

    componentDidMount() {
        this.setState({ note: this.props.note })
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState(prevState => ({ note: { ...prevState.note, [field]: value } }))
    }

    onSaveNote = (ev) => {
        ev.preventDefault()
        noteService.saveNote(this.state.note)
            .then(() => this.props.loadNotes())
            this.props.toggleEditMode()
        this.zeroFormNote()
    }
    zeroFormNote = () => {
        const emptyNote = { id: null, noteHeader: '', comment: '', imgUrl: '', videoUrl: '', type: '', todoTxt: '' }
        this.setState({ note: emptyNote })
    }

    render() {
        if (!this.state.note.id) return <div></div>
        return (
            <div className="wrapper">
                <form className="img-form" onSubmit={this.onSaveNote}>
                    <h1>Note Edit</h1>
                    <div className="input-header">
                        <label htmlFor="header" >Header</label>
                        <input type="text" name="header" id="header" value={this.state.note.header || ''} onChange={this.handleChange} />
                    </div>
                    <div className="input-comment">
                        <label htmlFor="comment" ><i className="far fa-image"></i></label>
                        <input type="text" name="comment" id="comment" value={this.state.note.comment || ''} placeholder="Enter text"
                            onChange={this.handleChange} />
                    </div>
                    <button onSubmit={this.onSaveNote}>Save Note</button>
                </form>
            </div>
        )
    }
}