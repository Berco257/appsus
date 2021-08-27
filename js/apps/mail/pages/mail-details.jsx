const { Link } = ReactRouterDOM

import { mailService } from '../services/mail.service.js'
import { mailUtilService } from '../services/mail.util.service.js'
import { utilService } from '../../../services/util.service.js'

import { MailFolderList } from "../cmps/mail-folder-list.jsx"
import { MailCompose } from '../cmps/mail-compose.jsx'

export class MailDetails extends React.Component {
    state = {
        mail: null,
        isComposeMode: false,
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
                    if (!this.state.mail) {
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

    setComposeMode = (mode) => {
        this.setState({ isComposeMode: mode })
    }

    getDate = () => {
        const { mail } = this.state
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const year = new Date(mail.sentAt).getFullYear()
        const month = monthNames[new Date(mail.sentAt).getMonth()]
        const day = new Date(mail.sentAt).getDate()
        const date = `${month} ${day}, ${year}`

        const hours = new Date(mail.sentAt).getHours()
        const minutes = new Date(mail.sentAt).getMinutes()
        let time = `${hours}:${minutes}`;
        time += hours >= 0 && hours < 12 ? ` am` : ` pm`

        return `${date}, ${time}`
    }

    render() {
        const { mail, isComposeMode } = this.state
        const pathName = this.props.location.pathname.split("/")[2]

        if (!mail) return <div>Loading...</div>

        return (
            <section className='mail-details-container'>
                <h1>Mail app</h1>

                <div className="mail-details-wrapper">
                    <div className="wrapper">
                    <MailCompose func={this.loadMails} onAddEditMail={mailUtilService.onAddEditMail}
                            makeId={utilService.makeId} onRemoveMail={mailUtilService.onRemoveMail}
                            isComposeMode={isComposeMode} setComposeMode={this.setComposeMode} composedMail={null}/>

                        <MailFolderList />
                    </div>
                    <div className="mail-details">
                        <div className="mail-nav-container">
                            <nav className="mail-nav">
                                <div className="mail-nav-back"><Link to={`/mail/${pathName}`}><img src="./img/apps/mail/arrow_back.png" /></Link></div>
                            </nav>
                        </div>
                        <div className="mail-details-subject">subject: {mail.subject}</div>
                        <div>
                            <div className="mail-details-from">from: {`${mail.from.fullname} <${mail.from.email}>`}</div>
                            <div className="mail-details-send-at">sent at: {this.getDate()}</div>
                        </div>
                        <div className="mail-details-from">to: {`${mail.to.fullname} <${mail.to.email}>`}</div>
                        <div className="mail-details-body">body: {mail.body}</div>
                    </div>
                </div>
            </section>
        )
    }
}