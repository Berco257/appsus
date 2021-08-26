
export class TodoLine extends React.Component{
    state = {
        isTodoChecked: false
    }

    toggleTodoLine = () => {
        this.setState({ isTodoChecked: !this.state.isTodoChecked })
    }

    render(){
        const {todo} = this.props;
        const {isTodoChecked} = this.state
        return (
            <div className="todo-line">
                <input type="checkbox" onChange = {this.toggleTodoLine}/>
                <h1 className ={(isTodoChecked)? 'done': ''}>{todo.txt}</h1>
            </div>
        )
    }
}