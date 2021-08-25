const { Route, Switch } = ReactRouterDOM

import { mailService } from '../services/mail.service.js'
import { MailDetails } from '../cmps/mail-details.jsx'
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

    removeMail = (mailId) => {
        mailService.removeMail(mailId).then(() => {
            eventBusService.emit('user-msg', { txt: 'Mail deleted!', type: 'danger' })
            this.loadMail()
        })
    }

    render() {
        const { mailsToShow } = this.state
        return (
            <section className="mail-app">
                <h1>Mail app</h1>
                {/* <Filter></Filter> */}
                {/* <SideBar></SideBar> */}
                <Switch>
                    <Route path='/mail/:mailId' component={MailDetails} />
                    <Route path='/mail' render={(props) => (<MailList {...props} mails={mailsToShow} />)} />
                </Switch>
            </section>
        )
    }
}