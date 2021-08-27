export class NewMail extends React.Component {
    state = {
        mail: {
            to: '',
            subject: '',
            body: '',
        },
        isNewMailActive: false
    }

    showDraft = () => {
        this.setState({ isNewMailActive: true })
    }
    removeDraft = () => {
        //למחוק את ה DRAFT מייל
        this.setState({ isNewMailActive: false, mail: { to: '', subject: '', body: '' } })
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState(prevState => ({ mail: { ...prevState.mail, [field]: value } }))

    }

    render() {
        const { mail, isNewMailActive } = this.state
        return (
            <div className="new-mail-container">
                <div className={`compose ${isNewMailActive ? 'active' : ''}`} onClick={this.showDraft}>
                    Compose
                </div>
                <div className="new-mail">
                    <form action="">
                        <div className="new-mail-to">
                            <input type="text" name="new-mail-to" id="new-mail-to" placeholder="To"
                            value={mail.to} onChange={this.handleChange}/>
                        </div>
                        <div className="new-mail-subject">
                            <input type="text" name="new-mail-subject" id="new-mail-subject"
                                value={mail.subject} onChange={this.handleChange} placeholder="Subject" />
                        </div>
                        <div className="new-mail-body">
                            <textarea id="new-mail-body" name="new-mail-body" rows="4" cols="50"
                            value={mail.body} onChange={this.handleChange} placeholder="start writing here...">
                            </textarea>

                        </div>
                        <div className="send-btn">Send</div>
                        <div className="remove-draft-btn" onClick={this.removeDraft}><img src="./img/apps/mail/trash.png" alt="" /></div>
                    </form>
                </div>
            </div>
        )
    }
}