export class NewMail extends React.Component {
    state = {
        isNewMailActive: false
    }

    showDraft = () => {
        this.setState({ isNewMailActive: true })
    }
    removeDraft = () => {
        this.setState({ isNewMailActive: false })
    }

    render() {
        const { isNewMailActive } = this.state
        return (
            <div className="new-mail-container">
                <div className={`compose ${isNewMailActive ? 'active' : ''}`} onClick={this.showDraft}>
                    Compose
                </div>
                <div className="new-mail">
                    <form action="">
                        <div className="new-mail-to">
                            <input type="text" name="new-mail-to" id="new-mail-to" placeholder="To" />
                        </div>
                        <div className="new-mail-subject">
                            <input type="text" name="new-mail-subject" id="new-mail-subject" placeholder="Subject" />
                        </div>
                        <div className="new-mail-body">
                            <textarea id="new-mail-body" name="new-mail-body" rows="4" cols="50" placeholder="start writing here...">
                            </textarea>
                        </div>
                        <div className="send-btn">Send</div>
                        <div className="remove-draft-btn" onClick={this.removeDraft}><img src="../../../../img/apps/mail/trash.png" alt="" /></div>
                    </form>
                </div>
            </div>
        )
    }
}