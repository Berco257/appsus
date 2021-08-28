import { ColorInput } from '../dynamicInputs/color-input.jsx';
import { noteService } from '../../services/note.service.js';


export class NoteDyanmicTxt extends React.Component {

    state = {
        inputType: 'color',
        noteStyle: {
            // backgroundColor:'green' -- at didmount need to check fo style
        }
    }

    componentDidMount() {
        if (this.props.note.style){
            this.setState({noteStyle: this.props.note.style})
        }
    }

    onChangeStyle = (field, value) => {
        this.setState(prevState => ({ noteStyle: { ...prevState.noteStyle, [field]: value } }))
        this.props.note['style'] = {[field]: value}
        noteService.saveNote(this.props.note)
            .then(() => this.props.loadNotes())
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
                <h4>{note.info.txt}</h4>
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