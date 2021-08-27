export class ImgForm extends React.Component {
    state = {
        note: {
            id: '', 
            noteHeader: '',
            comment: '',
            imgUrl: '',
            videoUrl: '',
            todoTxt: '',
            type: '',
        },
    }

    componentDidMount() {
        this.setState({note:this.props.note})
    }
    
    render() {
        return (
            <div className="wrapper">
                <form className="img-form" onSubmit={this.props.onSaveNote}>
                    <h1>{this.state.note.id ? 'Edit' : 'Add'} Note</h1>
                    <div className="input-header">
                    <label htmlFor="noteHeader" >Header</label>
                    <input type="text" name="noteHeader" id="noteHeader" value={this.state.note.noteHeader} onChange={this.props.handleChange} />
                    </div>
                    <div className="input-comment">
                    <label htmlFor="comment" >Comment</label>
                    <input type="text" name="comment" id="comment" value={this.state.note.comment} onChange={this.props.handleChange} />
                    </div>
                    <div className="input-imgUrl">
                    <label htmlFor="imgUrl" ><i className="far fa-image"></i></label>
                    <input type="url" name="imgUrl" id="imgUrl" value={this.state.note.imgUrl} placeholder="Enter imape URL"
                        onChange={this.props.handleChange} />
                    </div>
                    <button onSubmit={this.props.onSaveNote}>Save Note</button>
                </form>
            </div>
        )
    }
}