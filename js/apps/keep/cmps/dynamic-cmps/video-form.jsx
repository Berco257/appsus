export class VideoForm extends React.Component {
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
                <label htmlFor="videoUrl" ><i className="fab fa-youtube"></i></label>
                <div className="video-input-cont">
                    <input type="url" name="videoUrl" id="videoUrl" value={videoUrl} onChange={(ev) => { this.props.handleChange(ev) }} />
                </div>
                <button onSubmit={this.props.onSaveNote}>Save Note</button>
            </form>
        )
    }
}