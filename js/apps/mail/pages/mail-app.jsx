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

    render() {
        const { mailsToShow } = this.state
        return (
            <section className="mail-app">
                <h1>Mail app</h1>
                <MailList mails={mailsToShow} />
            </section>
        )
    }
}