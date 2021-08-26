const { Route, Switch } = ReactRouterDOM

import { mailService } from '../services/mail.service.js'
import { MailList } from '../cmps/mail-list.jsx'
import { MailSideNav } from '../cmps/mail-side-nav.jsx'

export class MailApp extends React.Component {
    state = {
        mailsToShow: [],
        filterBy: null,
    }

    componentDidMount() {
        this.loadMails()
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


    // removeMail = (mailId) => {
    //     mailService.removeMail(mailId).then(() => {
    //         eventBusService.emit('user-msg', { txt: 'Mail deleted!', type: 'danger' })
    //         this.loadMail()
    //     })
    // }

    render() {
        const { mailsToShow } = this.state
        return (
            <section className="mail-app">
                <h1>Mail app</h1>
                <div className="mail-app-wrapper">
                    <MailSideNav />
                    <MailList mails={mailsToShow} moveMailToTrash={this.moveMailToTrash} toggleMailIsRead={this.toggleMailIsRead} />
                </div>
            </section>
        )
    }
}