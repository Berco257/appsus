import { ColorInput } from './dynamicInputs/color-input.jsx';


export class NoteDyanmic extends React.Component {

    state = {
        inputType: 'color',
        footerStyle: {

        }
    }

    onChangeInputType = ({ target }) => {

        this.setState({ inputType: target.value })

    }

    onChangeStyle = (field, value) => {
        this.setState(prevState => ({ footerStyle: { ...prevState.footerStyle, [field]: value } }))
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
        const { inputType, footerStyle } = this.state
        const DynamicCmp = (props) => {
            switch (props.type) {
                case 'color':
                    return <ColorInput {...props} />
            }
        }
        return (
            <section style={footerStyle} className="note-dynamic">
                <h3>{note.header}</h3>
                <h4>{note.info.txt}</h4>
                <DynamicCmp onChangeStyle={this.onChangeStyle} type={inputType} />
                <div>
                    <button onClick={this.props.onDeleteNote}>Delete</button>
                    <button onClick={() => { this.props.onEditNote(note) }}>Edit</button>
                    <button onClick={this.onPinNote}>{this.changePinSymbol()}</button>
                </div>
            </section>
        )
    }
}