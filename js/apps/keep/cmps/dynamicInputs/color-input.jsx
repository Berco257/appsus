export class ColorInput extends React.Component {
  state = {
    color:'',
  }

  onPickColor = ({ target })=> {
    const value = target.value
    this.setState({color:value})
    this.props.onChangeStyle('backgroundColor', value)
  }

  render() {
    return (
      <div className="dynamic-input color" style={{backgroundColor:this.state.color}}>
          <input type="color" onChange={this.onPickColor} value={this.state.color} />
      </div>
    )
  }
}
