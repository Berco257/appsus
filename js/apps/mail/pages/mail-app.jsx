const { Route, Switch } = ReactRouterDOM

import { mailService } from '../services/mail.service.js'
import { MailList } from '../cmps/mail-list.jsx'

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
                <MailList mails={mailsToShow}/>
            </section>
        )
    }
}