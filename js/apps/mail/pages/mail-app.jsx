const { Route, Switch } = ReactRouterDOM

import { mailService } from '../services/mail.service.js'
import { mailUtilService } from '../services/mail.util.service.js'
import { MailList } from '../cmps/mail-list.jsx'
import { MailFolderList } from '../cmps/mail-folder-list.jsx'
import { MailCompose } from '../cmps/mail-compose.jsx'
import { utilService } from '../../../services/util.service.js'

export class MailApp extends React.Component {
    state = {
        mailsToShow: [],
        filterBy: null,
    }

    componentDidMount() {
        const pathName = this.props.location.pathname.split("/")[2]
        if (mailUtilService.isWrongFolder(pathName)) {
            this.props.history.push('/mail/inbox')
            this.setState({ filterBy: 'inbox' }, () => this.loadMails())
            return
        }
        this.setState({ filterBy: pathName }, () => this.loadMails())

    }
    componentDidUpdate(prevProps, prevState) {
        const pathName = this.props.location.pathname.split("/")[2]
        if (mailUtilService.isWrongFolder(pathName)) {
            this.props.history.push('/mail/inbox')
            this.setState({ filterBy: 'inbox' }, () => this.loadMails())
            return
        }

        if (prevProps.location.pathname.split("/")[2] !== pathName) {
            this.setState({ filterBy: pathName }, () => this.loadMails())
        }
    }

    loadMails = () => {
        mailService.query(this.state.filterBy).then(mailsToShow => {
            this.setState({ mailsToShow })
        })
    }

    onMoveMailToTrash = mailId => {
        mailService.moveMailToTrash(mailId).then(() => {
            this.loadMails()
        })
    }

    onToggleMailIsRead = mailId => {
        mailService.toggleMailIsRead(mailId).then((mail) => {
            this.loadMails()
        })
    }

    onToggleMailIsStarred = mailId => {
        mailService.toggleMailIsStarred(mailId).then((mail) => {
            this.loadMails()
        })
    }

    onRemoveMail = (mailId) => {
        mailService.removeMail(mailId).then(() => {
            // eventBusService.emit('user-msg', { txt: 'Mail deleted!', type: 'danger' })
            this.loadMails()
        })
    }

    onRestoreMail = (mailId) => {
        mailService.restoreMail(mailId).then(() => {
            // eventBusService.emit('user-msg', { txt: 'Mail deleted!', type: 'danger' })
            this.loadMails()
        })
    }

    onAddMail = ({ toEmail, subject, body }, sentAt, mailId) => {
        let fullname = toEmail.split("@")[0]
        fullname = fullname.charAt(0).toUpperCase() + fullname.substring(1, fullname.length)
        const mail = {
            dir: 'out', to: { fullname, email: toEmail }, from: mailService.getLoggedInUser(),
            sentAt, subject, body, isRead: false
        }

        mailService.addEditMail(mail, mailId).then(() => {
            // eventBusService.emit('user-msg', { txt: 'Mail deleted!', type: 'danger' })
            this.loadMails()
        })
    }

    createId() {
        return utilService.makeId()
    }

    render() {
        const { mailsToShow } = this.state
        const pathName = this.props.location.pathname
        return (
            <section className="mail-app">
                <h1>Mail app</h1>
                <div className="mail-app-wrapper">
                    <div className="wrapper">
                        <MailCompose addMail={this.onAddMail} createId={this.createId} removeMail={this.onRemoveMail} />
                        <MailFolderList />
                    </div>
                    <MailList mails={mailsToShow} moveMailToTrash={this.onMoveMailToTrash}
                        toggleMailIsRead={this.onToggleMailIsRead} pathName={pathName}
                        removeMail={this.onRemoveMail} restoreMail={this.onRestoreMail}
                        toggleMailIsStarred={this.onToggleMailIsStarred} />
                </div>
            </section>
        )
    }
}