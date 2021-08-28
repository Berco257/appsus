export class TxtForm extends React.Component {
    render() {
        const { id, header, comment, imgUrl, videoUrl, todoTxt, type } = this.props.note
        return (
            <form className="note-add" onSubmit={this.props.onSaveNote}>
                <h1>{id ? 'Edit' : 'Add'} Note</h1>
                <div className="input-header">
                    <label htmlFor="header" >Header</label>
                    <input type="text" name="header" id="header" value={header} onChange={(ev) => { this.props.handleChange(ev) }} />
                </div>
                <div className="input-comment">
                    <label htmlFor="comment" >Comment</label>
                    <input type="text" name="comment" id="comment" value={comment} onChange={(ev) => { this.props.handleChange(ev) }} />
                </div>
                <i className="far fa-file-alt"></i>
                <button onSubmit={this.props.onSaveNote}>Save Note</button>
            </form>
        )
    }
}