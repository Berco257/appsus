const { Link } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"

export class MailDetails extends React.Component {
    state = {
        mail: null,
    }

    componentDidMount() {
        this.loadMail()
    }

    loadMail = () => {
        const mailId = this.props.match.params.mailId
        mailService.getMailById(mailId)
            .then(mail => {
                this.setState({ mail }, () => {
                    if (!this.state.mail) this.props.history.push('/mail')
                })
            })
    }

    render() {
        const { mail } = this.state
        if (!mail) return <div>Loading...</div>

        return (
            <React.Fragment>
                <section className="mail-nav-container">
                    <nav className="mail-nav">
                        <div className="mail-nav-back"><Link to='/mail'><img src="../../../../img/apps/mail/arrow_back.png" /></Link></div>
                    </nav>
                </section>

                <section className='mail-details-container'>
                    <div className="mail-details-subject">subject: {mail.subject}</div>
                    <div>
                        <div className="mail-details-from">from: {mail.from}</div>
                        <div className="mail-details-send-at">sent at:{mail.sentAt}</div>
                    </div>
                    <div className="mail-details-from">to: {mail.to}</div>
                    <div className="mail-details-body">body: {mail.body}</div>
                </section>
            </React.Fragment>
        )
    }
}