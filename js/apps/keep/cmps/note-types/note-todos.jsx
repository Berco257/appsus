import { TodoLine } from '../../cmps/todo-line.jsx'
export class NoteTodos extends React.Component {
    render() {
        const { note } = this.props
        return (
            <section className="note-txt">
                <h3>{note.header}</h3>
                <h4>Label: {note.info.label}</h4>
                {note.info.todos.map((todo, idx) => <TodoLine key={idx} todo={todo} />)}
                <div className="btns-container">
                <button onClick={this.props.onDeleteNote}>Delete</button>
                <button onClick={() => { this.props.onEditNote(note) }}>Edit</button>
                </div>
            </section>
        )
    }
}