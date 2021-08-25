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
        console.log('field', field)
        this.setState(prevState => ({ footerStyle: { ...prevState.footerStyle, [field]: value } }))
    }

    render() {
        const { note } = this.props
        console.log(note);
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
                <DynamicCmp onChangeStyle={this.onChangeStyle} type={inputType}/>
                
            </section>
        )
    }
}