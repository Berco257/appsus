export class MailCompose extends React.Component {
    state = {
        mail: {
            toEmail: '',
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
        this.setState({ isNewMailActive: false, mail: { toEmail: '', subject: '', body: '' } })
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState(prevState => ({ mail: { ...prevState.mail, [field]: value } }))
    }

    saveMail = (mail) =>{
        this.props.addMail(mail)
        this.setState({ isNewMailActive: false, mail: { toEmail: '', subject: '', body: '' } })
    }

    render() {
        const { mail, isNewMailActive } = this.state
        return (
            <div className="mail-compose-container">
                <div className={`compose ${isNewMailActive ? 'active' : ''}`} onClick={this.showDraft}>
                    Compose
                </div>
                <div className="mail-compose">
                    <form className="mail-compose-form">
                        <div className="mail-compose-to">
                            <input type="text" name="toEmail" id="mail-compose-to" placeholder="To"
                                value={mail.toEmail} onChange={this.handleChange} />
                        </div>
                        <div className="mail-compose-subject">
                            <input type="text" name="subject" id="mail-compose-subject"
                                value={mail.subject} onChange={this.handleChange} placeholder="Subject" />
                        </div>
                        <div className="mail-compose-body">
                            <textarea name="body" id="mail-compose-body" rows="4" cols="50"
                                value={mail.body} onChange={this.handleChange} placeholder="start writing here...">
                            </textarea>

                        </div>
                        <div className="send-btn" onClick={() => this.saveMail(mail)} >Send</div>
                        <div className="remove-draft-btn" onClick={this.removeDraft}><img src="./img/apps/mail/trash.png" alt="" /></div>
                    </form>
                </div>
            </div>
        )
    }
}