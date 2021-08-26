const { Link } = ReactRouterDOM

import { mailService } from "../services/mail.service.js"
import { mailUtilService } from '../services/mail.util.service.js'
import { MailSideNav } from "../cmps/mail-side-nav.jsx"

export class MailDetails extends React.Component {
    state = {
        mail: null,
    }

    componentDidMount() {
        const pathName = this.props.location.pathname.split("/")[2]
        if (mailUtilService.isWrongFolder(pathName)) this.props.history.push('/mail/inbox')
        this.loadMail()
    }

    loadMail = () => {
        const mailId = this.props.match.params.mailId
        mailService.getMailById(mailId)
            .then(mail => {
                this.setState({ mail }, () => {
                    if (!this.state.mail){
                        this.props.history.push('/mail/inbox')
                        return
                    }
                    if (!this.state.mail.isRead) {
                        const mailId = this.state.mail.id
                        mailService.toggleMailIsRead(mailId)
                    }
                })
            })
    }

    render() {
        const { mail } = this.state
        const pathName = this.props.location.pathname.split("/")[2]

        if (!mail) return <div>Loading...</div>

        return (
            <section className='mail-details-container'>
                <h1>Mail app</h1>

                <div className="mail-details-wrapper">
                    <MailSideNav />
                    <div className="mail-details">
                        <div className="mail-nav-container">
                            <nav className="mail-nav">
                                <div className="mail-nav-back"><Link to={`/mail/${pathName}`}><img src="./img/apps/mail/arrow_back.png" /></Link></div>
                            </nav>
                        </div>
                        <div className="mail-details-subject">subject: {mail.subject}</div>
                        <div>
                            <div className="mail-details-from">from: {mail.from}</div>
                            <div className="mail-details-send-at">sent at:{mail.sentAt}</div>
                        </div>
                        <div className="mail-details-from">to: {mail.to}</div>
                        <div className="mail-details-body">body: {mail.body}</div>
                    </div>
                </div>
            </section>
        )
    }
}