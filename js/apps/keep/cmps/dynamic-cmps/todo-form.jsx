export class TodoForm extends React.Component {
    render() {
        const { id, noteHeader, comment, imgUrl, videoUrl, todoTxt, type } = this.props.note
        return (
            <form className="note-add" onSubmit={this.props.onSaveNote}>
                <h1>{id ? 'Edit' : 'Add'} Note</h1>
                <div className="input-header">
                    <label htmlFor="noteHeader" >Header</label>
                    <input type="text" name="noteHeader" id="noteHeader" value={noteHeader} onChange={(ev) => { this.props.handleChange(ev) }} />
                </div>
                <div className="input-comment">
                    <label htmlFor="comment" >Comment</label>
                    <input type="text" name="comment" id="comment" value={comment} onChange={(ev) => { this.props.handleChange(ev) }} />
                </div>
                <label htmlFor="todoTxt" ><i className="far fa-check-square"></i></label>
                <div className="todo-input-cont">
                    <input name="todoTxt" id="todoTxt" type="text" placeholder="Enter comma seperated list..." value={todoTxt}
                        onChange={(ev) => { this.props.handleChange(ev) }} />
                </div>
                <button onSubmit={this.props.onSaveNote}>Save Note</button>
            </form>
        )
    }
}
