import {TodoLine} from '../cmps/todo-line.jsx'
export class NotePreview extends React.Component {
    state = {
        infoType: null,
    }
    componentDidMount() {
    }

    render() {
        const { note } = this.props
        const { type } = note
        if (type === 'note-txt') {
            return (
                <article className="note-preview">
                    <h4>{note.info.txt}</h4>
                </article>
            )
        } else if (type === 'note-img') {
            return (
                <article className="note-preview">
                    <h4>Title: {note.info.title}</h4>
                    <img src={note.info.url} alt="" />
                </article>
            )
        } else if (type === 'note-todos'){
            return (
                <article className="note-todos">
                    <h4>Label: {note.info.label}</h4>
                    {note.info.todos.map((todo, idx) => <TodoLine key={idx} todo={todo}/>)}
                </article>
            )
        }
    }
}