const { Route, Switch } = ReactRouterDOM

import { mailService } from '../services/mail.service.js'
import { mailUtilService } from '../services/mail.util.service.js'
import { utilService } from '../../../services/util.service.js'

import { MailList } from '../cmps/mail-list.jsx'
import { MailFolderList } from '../cmps/mail-folder-list.jsx'
import { MailCompose } from '../cmps/mail-compose.jsx'

export class MailApp extends React.Component {
    state = {
        mailsToShow: [],
        filterBy: null,
        isComposeMode: false,
        composedMail: null,
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
    componentDidUpdate(prevProps) {
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

    setComposeMode = (mode, mailId = null) => {
        if (mailId !== null) {
            mailService.getMailById(mailId).then(mail => {
                this.setState({ isComposeMode: mode, composedMail: mail })
            })
        } else {
            this.setState({ isComposeMode: mode, composedMail: null })
        }
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

    onRestoreMail = (mailId) => {
        mailService.restoreMail(mailId).then(() => {
            // eventBusService.emit('user-msg', { txt: 'Mail deleted!', type: 'danger' })
            this.loadMails()
        })
    }



    render() {
        const { mailsToShow, isComposeMode } = this.state
        const pathName = this.props.location.pathname
        return (
            <section className="mail-app">
                <h1>Mail app</h1>
                <div className="mail-app-wrapper">
                    <div className="wrapper">
                        <MailCompose func={this.loadMails} onAddEditMail={mailUtilService.onAddEditMail}
                            makeId={utilService.makeId} onRemoveMail={mailUtilService.onRemoveMail}
                            isComposeMode={isComposeMode} setComposeMode={this.setComposeMode} composedMail={this.state.composedMail} />

                        <MailFolderList />
                    </div>
                    <MailList mails={mailsToShow} moveMailToTrash={this.onMoveMailToTrash}
                        toggleMailIsRead={this.onToggleMailIsRead} pathName={pathName} func={this.loadMails}
                        onRemoveMail={mailUtilService.onRemoveMail} restoreMail={this.onRestoreMail}
                        toggleMailIsStarred={this.onToggleMailIsStarred} setComposeMode={this.setComposeMode}/>
                </div>
            </section>
        )
    }
}