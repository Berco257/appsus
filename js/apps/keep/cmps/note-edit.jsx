import { ImgForm } from '../cmps/dynamic-cmps/img-form.jsx';
import { VideoForm } from '../cmps/dynamic-cmps/video-form.jsx';
import { TodoForm } from '../cmps/dynamic-cmps/todo-form.jsx';
import { noteService } from '../services/note.service.js';
export class NoteEdit extends React.Component {
    state = {
        isFormShown: false,
        currView: '',
    }
    onSaveNote = (ev) => {
        debugger;
        ev.preventDefault()
        noteService.saveNote(this.props.note)
            .then(() => this.props.loadNotes())
        this.props.zeroStateNote();
    }

    toggleForm = () => {
        this.setState({ isFormShown: !this.state.isFormShown })
    }
    

    render() {
        const { note } = this.props
        const {id, noteHeader, comment} = this.props.note
        const {handleChange} = this.props
        const {currView} = this.state
        const DynamicCmp = (props) => {
            switch (currView) {
                case 'img-form':
                    return <ImgForm note={note} handleChange={handleChange} onSaveNote = {this.onSaveNote}/>
                case 'video-form':
                    return <VideoForm note={note} handleChange={handleChange} onSaveNote = {this.onSaveNote}/>
                case 'todo-form':
                    return <TodoForm note={note} handleChange={handleChange} onSaveNote = {this.onSaveNote}/>
                default:
                    return <div>Choose Note</div>
            }
        }
        return (
            <section className="edit-options">
                <button onClick={this.toggleForm}>New Note</button>
                <div className= "forms-container" hidden={!this.state.isFormShown}>
                    <button onClick={()=>{this.setState({currView: 'img-form'})}}><i className="far fa-image"></i></button>
                    <button onClick={()=>{this.setState({currView: 'video-form'})}}><i className="fab fa-youtube"></i></button>
                    <button onClick={()=>{this.setState({currView: 'todo-form'})}}><i className="far fa-check-square"></i></button>
                    <DynamicCmp/>
                </div>
            </section>

        )
    }
}