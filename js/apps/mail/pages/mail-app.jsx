const { Route, Switch } = ReactRouterDOM

import { mailService } from '../services/mail.service.js'
import { mailUtilService } from '../services/mail.util.service.js'
import { MailList } from '../cmps/mail-list.jsx'
import { MailSideNav } from '../cmps/mail-side-nav.jsx'

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

    moveMailToTrash = mailId => {
        mailService.moveMailToTrash(mailId).then(() => {
            this.loadMails()
        })
    }

    toggleMailIsRead = mailId => {
        mailService.toggleMailIsRead(mailId).then((mail) => {
            this.loadMails()
        })
    }

    removeMail = (mailId) => {
        mailService.removeMail(mailId).then(() => {
            // eventBusService.emit('user-msg', { txt: 'Mail deleted!', type: 'danger' })
            this.loadMails()
        })
    }

    restoreMail = (mailId) => {
        mailService.restoreMail(mailId).then(() => {
            // eventBusService.emit('user-msg', { txt: 'Mail deleted!', type: 'danger' })
            this.loadMails()
        })
    }

    render() {
        const { mailsToShow } = this.state
        const pathName = this.props.location.pathname
        return (
            <section className="mail-app">
                <h1>Mail app</h1>
                <div className="mail-app-wrapper">
                    <MailSideNav />
                    <MailList mails={mailsToShow} moveMailToTrash={this.moveMailToTrash}
                    toggleMailIsRead={this.toggleMailIsRead} pathName={pathName}
                    removeMail={this.removeMail} restoreMail={this.restoreMail} />
                </div>
            </section>
        )
    }
}