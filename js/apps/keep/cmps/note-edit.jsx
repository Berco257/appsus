import { ImgForm } from '../cmps/dynamic-cmps/img-form.jsx';
import { VideoForm } from '../cmps/dynamic-cmps/video-form.jsx';
import { TodoForm } from '../cmps/dynamic-cmps/todo-form.jsx';
import { noteService } from '../services/note.service.js';
export class NoteEdit extends React.Component {
    state = {
        currView: '',
        isFormShown: false,
    }
    // componentDidMount(){
    //     this.setState({isFormShown:this.props.isFormShown})
    // }

    onSaveNote = (ev) => {
        ev.preventDefault()
        noteService.saveNote(this.props.note)
            .then(() => this.props.loadNotes())
        this.props.zeroStateNote();
    }

    toggleForm = () => {
        this.setState({ isFormShown: !this.state.isFormShown })
        this.props.zeroStateNote();
    }

    render() {
        const { note } = this.props
        const { handleChange } = this.props
        const { currView, isFormShown } = this.state
        const DynamicCmp = (props) => {
            switch (currView) {
                case 'note-img':
                    return <ImgForm note={note} key="form-edit" handleChange={handleChange} onSaveNote={this.onSaveNote} />
                case 'note-video':
                    return <VideoForm note={note} handleChange={handleChange} onSaveNote={this.onSaveNote} />
                case 'note-todos':
                    return <TodoForm note={note} handleChange={handleChange} onSaveNote={this.onSaveNote} />
                default:
                    return <div className="choose-note-txt">Choose Note</div>
            }
        }
        return (
            <section className="edit-options">
                <button className="add-note-btn" onClick={this.toggleForm}>New Note</button>
                <div className="forms-container" hidden={!isFormShown}>
                    <button onClick={() => { this.setState({ currView: 'note-img' }) }}><i className="far fa-image"></i></button>
                    <button onClick={() => { this.setState({ currView: 'note-video' }) }}><i className="fab fa-youtube"></i></button>
                    <button onClick={() => { this.setState({ currView: 'note-todos' }) }}><i className="far fa-check-square"></i></button>
                    <DynamicCmp />
                </div>
            </section>

        )
    }
}