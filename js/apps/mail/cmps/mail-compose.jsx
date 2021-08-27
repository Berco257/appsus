export class MailCompose extends React.Component {
    state = {
        mail: {
            toEmail: '',
            subject: '',
            body: '',
        },
        mailId: null,
        isNewMailActive: false
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    interval;
    showDraft = () => {
        if (this.state.isNewMailActive) return
        const mailId = this.props.createId()
        this.setState({ isNewMailActive: true, mailId }, () => {
            this.interval = setInterval(() => {
                this.saveMail(this.state.mail, 0)
            }, 5000)
        })
    }

    removeDraft = () => {
        clearInterval(this.interval)
        this.props.removeMail(this.state.mailId)
        this.setState({ isNewMailActive: false, mail: { toEmail: '', subject: '', body: '' } })
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState(prevState => ({ mail: { ...prevState.mail, [field]: value } }))
    }

    saveMail = (mail, sentAt) => {
        this.props.addMail(mail, sentAt, this.state.mailId)
        if (sentAt) {
            clearInterval(this.interval)
            this.setState({ isNewMailActive: false, mail: { toEmail: '', subject: '', body: '' }, mailId: null })
            return
        }
        this.setState({ mail })
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
                        <div className="send-btn" onClick={() => this.saveMail(mail, Date.now())} >Send</div>
                        <div className="save-exit-btn" onClick={() => this.saveMail(mail, 0)} >{`Save & exit`}</div>
                        <div className="remove-draft-btn" onClick={this.removeDraft}><img src="./img/apps/mail/trash.png" alt="" /></div>
                    </form>
                </div>
            </div>
        )
    }
}