import { ColorInput } from './dynamicInputs/color-input.jsx';
import { noteService } from '../services/note.service.js';
import { TodoLine } from '../../cmps/todo-line.jsx'

export class NoteDyanmicTodos extends React.Component {

    state = {
        inputType: 'color',
        noteStyle: {

        }
    }

    onChangeStyle = (field, value) => {
        this.setState(prevState => ({ noteStyle: { ...prevState.noteStyle, [field]: value } }))
    }

    onPinNote = () => {
        this.props.note.isPinned = !this.props.note.isPinned;
        noteService.saveNote(this.props.note)
            .then(() => this.props.loadNotes())
    }
    changePinSymbol() {
        const iconStyle = { color: 'grey' }
        if (this.props.note.isPinned) {
            return <i className="fas fa-thumbtack"></i>
        } else return <i className="fas fa-thumbtack" style={iconStyle} ></i>
    }

    render() {
        const { note } = this.props
        const { inputType, noteStyle } = this.state
        const DynamicCmp = (props) => {
            switch (props.type) {
                case 'color':
                    return <ColorInput {...props} />
            }
        }
        return (
            <section style={noteStyle} className="note-dynamic">
                <h3>{note.header}</h3>
                <h4>Label: {note.info.label}</h4>
                {note.info.todos.map((todo, idx) => <TodoLine key={idx} todo={todo} />)}
                <div className="btns-container">
                <DynamicCmp onChangeStyle={this.onChangeStyle} type={inputType} />
                    <button onClick={this.props.onDeleteNote}><i className="fas fa-trash-alt"></i></button>
                    <button onClick={() => { this.props.onEditNote(note) }}> <i className="fas fa-pencil-alt"></i></button>
                    <button onClick={this.onPinNote}>{this.changePinSymbol()}</button>
                </div>
            </section>
        )
    }
}