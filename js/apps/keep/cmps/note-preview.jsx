import { NoteDyanmic } from '../cmps/note-dynamic.jsx'
import { TodoLine } from '../cmps/todo-line.jsx'
import { noteService } from '../services/note.service.js'
export class NotePreview extends React.Component {
    state = {
        infoType: null,
    }
    componentDidMount() {
    }

    onChangeInputType = ({ target }) => {
        this.setState({ inputType: target.value })
      }

    onChangeStyle = (field, value) => {
        console.log('field', field)
        this.setState(prevState => ({ footerStyle: { ...prevState.footerStyle, [field]: value } }))
    }

    onDeleteNote = () => {
        noteService.deleteNote(this.props.note.id)
        .then(this.props.loadNotes())
      }

    render() {
        const { note } = this.props
        const { type } = note
        if (type === 'note-txt') {
            return (
                <article className="note-preview">
                    <NoteDyanmic note={note}/>
                    <button onClick = {this.onDeleteNote}>Delete</button>
                </article>
            )
        } else if (type === 'note-img') {
            return (
                <article className="note-preview">
                    <h3>{note.header}</h3>
                    <h4>{note.info.title}</h4>
                    <img src={note.info.url} alt="" />
                    <button onClick = {this.onDeleteNote}>Delete</button>
                </article>
            )
        } else if (type === 'note-todos') {
            return (
                <article className="note-todos">
                    <h3>{note.header}</h3>
                    <h4>Label: {note.info.label}</h4>
                    {note.info.todos.map((todo, idx) => <TodoLine key={idx} todo={todo} />)}
                    <button onClick = {this.onDeleteNote}>Delete</button>
                </article>
            )
        } else if (type === 'note-video') {
            return (
                <article className="note-preview">
                    <h3>{note.header}</h3>
                    <h4>{note.info.title}</h4>
                    <iframe width="250" height="187" src={note.info.url}>
                    <button onClick = {this.onDeleteNote}>Delete</button>
                    </iframe>
                </article>
            )
        }
    }
}