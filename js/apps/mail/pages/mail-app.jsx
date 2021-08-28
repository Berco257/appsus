const { Route, Switch } = ReactRouterDOM

import { mailService } from '../services/mail.service.js'
import { mailUtilService } from '../services/mail.util.service.js'
import { utilService } from '../../../services/util.service.js'

import { MailList } from '../cmps/mail-list.jsx'
import { MailFolderList } from '../cmps/mail-folder-list.jsx'
import { MailCompose } from '../cmps/mail-compose.jsx'
import { MailFilter } from '../cmps/mail-filter.jsx'

export class MailApp extends React.Component {
    state = {
        mailsToShow: [],
        filterBy: {
            folder: null,
            phrase: '',
            isRead: 'all'
        },
        isComposeMode: false,
        composedMail: null,
    }

    componentDidMount() {
        let folder = this.props.location.pathname.split("/")[2]
        if (folder === 'search') folder = 'index'

        if (mailUtilService.isWrongFolder(folder)) {
            this.props.history.push('/mail/inbox')
            this.setState(prevState => ({ filterBy: { ...prevState.filterBy, folder: 'inbox' } }))
            return
        }
        this.setState(prevState => ({ filterBy: { ...prevState.filterBy, folder: folder } }), ()=>{
            this.loadMails()
        })
    }

    componentDidUpdate(prevProps) {
        const folder = this.props.location.pathname.split("/")[2]
        if (mailUtilService.isWrongFolder(folder)) {
            this.props.history.push('/mail/inbox')
            this.setState(prevState => ({ filterBy: { ...prevState.filterBy, folder: 'inbox' } }), () => this.loadMails())
            return
        }

        if (prevProps.location.pathname.split("/")[2] !== folder) {
            this.setState(prevState => ({ filterBy: { ...prevState.filterBy, folder } }), () => this.loadMails())

        }
    }

    loadMails = (filterBy) => {
        if (filterBy) {
            this.props.history.push(`/mail/${filterBy.folder}`)
            this.setState({ filterBy })
        }

        mailService.query(filterBy ? filterBy : this.state.filterBy).then(mailsToShow => {
            this.setState({ mailsToShow })
        })
    }

    setComposeMode = (mode, mailId = null) => {
        if (mailId !== null) {
            mailService.getMailById(mailId).then(mail => {
                this.setState({ isComposeMode: mode, composedMail: mail })
            })
        } else {
            this.setState({ isComposeMode: mode, composedMail: null })
        }
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

    onRestoreMail = (mailId) => {
        mailService.restoreMail(mailId).then(() => {
            // eventBusService.emit('user-msg', { txt: 'Mail deleted!', type: 'danger' })
            this.loadMails()
        })
    }

    render() {
        const { mailsToShow, isComposeMode } = this.state
        const pathName = this.props.location.pathname
        const folder = pathName.split("/")[2]
        return (
            <section className="mail-app">
                <div className="header">
                    <h1>Mail app</h1>
                    <MailFilter loadMails={this.loadMails} folder={folder} />
                </div>
                <div className="mail-app-wrapper">


                    <div className="wrapper">
                        <MailCompose func={this.loadMails} onAddEditMail={mailUtilService.onAddEditMail}
                            makeId={utilService.makeId} onMoveMailToTrash={mailUtilService.onMoveMailToTrash}
                            isComposeMode={isComposeMode} setComposeMode={this.setComposeMode} composedMail={this.state.composedMail} />

                        <MailFolderList />
                    </div>

                    <MailList mails={mailsToShow} onMoveMailToTrash={mailUtilService.onMoveMailToTrash}
                        toggleMailIsRead={this.onToggleMailIsRead} pathName={pathName} func={this.loadMails}
                        onRemoveMail={mailUtilService.onRemoveMail} restoreMail={this.onRestoreMail}
                        toggleMailIsStarred={this.onToggleMailIsStarred} setComposeMode={this.setComposeMode} />
                </div>
            </section>
        )
    }
}