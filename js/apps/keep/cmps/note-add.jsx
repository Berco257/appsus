export class NoteAdd extends React.Component {
    state = {
        note: {
            noteHeader: '',
            comment: '',
            imgUrl: '',
            videoUrl: '',
        }
    }
    handleChange = ({ target }) => {
        const field = target.name
        this.setState(prevState => ({ note: { ...prevState.note, [field]: value } }))
      }

    render() {
        const {noteHeader, comment, imgUrl, videoUrl} = this.state.note
        return (
            <form className="note-add" onSubmit={this.onSaveNote}>
                <label htmlFor="noteHeader" >Header</label>
                <input type="text" name="noteHeader" id="noteHeader" value={noteHeader} onChange={this.handleChange} />
                <label htmlFor="comment" >Comment</label>
                <input type="text" name="comment" id="comment" value={comment} onChange={this.handleChange} />
                <label htmlFor="imgUrl" >Add Image</label>
                <input type="url" name="imgUrl" id="imgUrl" value={imgUrl} onChange={this.handleChange}/>
                <label htmlFor="videoUrl" >Add Video</label>
                <input type="url" name="videoUrl" id="videoUrl" value={videoUrl} onChange={this.handleChange}/>
                <button>Add checkmark list</button>
                <button onSubmit={this.onSaveNote}>Save Car</button>
            </form>
        )
    }
}