import { ImgForm } from '../cmps/dynamic-cmps/img-form.jsx';
import { VideoForm } from '../cmps/dynamic-cmps/video-form.jsx';
import { TodoForm } from '../cmps/dynamic-cmps/todo-form.jsx';
import { TxtForm } from '../cmps/dynamic-cmps/txt-form.jsx';
export class NoteEdit extends React.Component {
    state ={
        currType: '',
    }

    componentDidMount() {
    }
    onChooseType = (btnType)=>{
        this.setState({ currType: btnType })
    }

    render() {
        const { note, isEdit, isNewNote } = this.props
        if (this.state.currType ===''){
            var currView = note.type;
        }  else {
            var currView = this.state.currType;

        }
        if (currView === '' && (!this.props.isNewNote)) return <div></div>;
        const DynamicCmp = () => {

            switch (currView) {
                case 'note-img':
                    return <ImgForm note={note} loadNotes={this.props.loadNotes} toggleEditMode={this.props.toggleEditMode} />
                case 'note-video':
                    return <VideoForm note={note} loadNotes={this.props.loadNotes} toggleEditMode={this.props.toggleEditMode} />
                case 'note-todos':
                    return <TodoForm note={note} loadNotes={this.props.loadNotes} toggleEditMode={this.props.toggleEditMode} />
                case 'note-txt':
                    return <TxtForm note={note} loadNotes={this.props.loadNotes} toggleEditMode={this.props.toggleEditMode} />
                default:
                    return <div className="choose-note-txt">Choose Note</div>
            }
        }
        return (
            <section className={`edit-options ${isEdit ? 'active' : ''}`}>
                <DynamicCmp />
                <div className={`form-btns-container ${isNewNote ? 'active' : ''}`} >
                    <button onClick={() => { this.onChooseType('note-img') }}><i className="far fa-image"></i></button>
                    <button onClick={() => { this.onChooseType('note-video') }}><i className="fab fa-youtube"></i></button>
                    <button onClick={() => { this.onChooseType('note-todos') }}><i className="far fa-check-square"></i></button>
                    <button onClick={() => { this.onChooseType('note-txt') }}><i className="far fa-file-alt"></i></button>
                </div>
            </section>

        )
    }
}