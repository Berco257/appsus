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

    interval;

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.composedMail !== this.props.composedMail) {
            if (this.props.composedMail !== null) {
                const { subject, body } = this.props.composedMail
                const toEmail = this.props.composedMail.to.email
                const mailId = this.props.composedMail.id
                clearInterval(this.interval)
                this.setState({ mail: { toEmail, subject, body }, mailId }, () => {
                    this.interval = setInterval(() => {
                        this.onAddEditMail(this.state.mail, 0, false)
                    }, 5000)
                })
            }
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval)
    }

    showDraft = () => {
        clearInterval(this.interval)
        const mailId = this.props.makeId()
        this.props.setComposeMode(true)
        this.setState({ mail: { toEmail: '', subject: '', body: '' }, mailId }, () => {
            this.interval = setInterval(() => {
                this.onAddEditMail(this.state.mail, 0, false)
            }, 5000)
        })
    }

    onMoveMailToTrash = () => {
        clearInterval(this.interval)
        this.props.onMoveMailToTrash(this.state.mailId, this.props.func)
        this.props.setComposeMode(false)
        this.setState({ mail: { toEmail: '', subject: '', body: '' } })
    }

    handleChange = ({ target }) => {
        const field = target.name
        const value = target.value
        this.setState(prevState => ({ mail: { ...prevState.mail, [field]: value } }))
    }

    onAddEditMail = (mail, sentAt, isAddEditDone) => {
        this.props.onAddEditMail(mail, sentAt, this.state.mailId, this.props.func)
        if (isAddEditDone) {
            clearInterval(this.interval)
            this.props.setComposeMode(false)
            this.setState({ mail: { toEmail: '', subject: '', body: '' }, mailId: null })
        }
    }

    render() {
        const { mail } = this.state
        return (
            <div className="mail-compose-container">
                <div className={`compose ${this.props.isComposeMode ? 'active' : ''}`} onClick={this.showDraft}>
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
                        <div className="send-btn" onClick={() => this.onAddEditMail(mail, Date.now(), true)} >Send</div>
                        <div className="save-exit-btn" onClick={() => this.onAddEditMail(mail, 0, true)} >{`Save & exit`}</div>
                        <div className="remove-draft-btn" onClick={this.onMoveMailToTrash}><img src="./img/apps/mail/trash.png" alt="" /></div>
                    </form>
                </div>
            </div>
        )
    }
}