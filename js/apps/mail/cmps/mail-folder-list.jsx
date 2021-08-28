const { NavLink } = ReactRouterDOM
import { mailService } from '../services/mail.service.js'

export class MailFolderList extends React.Component {
    state = {
        menuMode: false
    }

    inboxUnreadCount = mailService.getUnreadMailsCount('inbox')
    starredUnreadCount = mailService.getUnreadMailsCount('starred')
    sentUnreadCount = mailService.getUnreadMailsCount('sent')
    draftUnreadCount = mailService.getUnreadMailsCount('draft')
    trashUnreadCount = mailService.getUnreadMailsCount('trash')

    toggle
    toggleMenu = () => {
        this.setState({ menuMode: !this.state.menuMode }, () => {
            console.log(this.state.menuMode);
        })
    }

    render() {
        return (
            <div className="mail-folder-list">
                <div className={`open-menu ${this.state.menuMode ? 'active' : ''}`} onClick={this.toggleMenu}>≡</div>
                <div className="list-wrapper">
                    <div className="inbox">
                        <NavLink to="/mail/inbox" >
                            <span>Inbox</span>
                            <span className="unread">{this.inboxUnreadCount ? this.inboxUnreadCount : ''}</span>
                        </NavLink>
                    </div>
                    <div className="starred">
                        <NavLink to="/mail/starred" >
                            <span>Starred</span>
                            <span className="unread">{this.starredUnreadCount ? this.starredUnreadCount : ''}</span>
                        </NavLink>
                    </div>
                    <div className="sent">
                        <NavLink to="/mail/sent" >
                            <span>Sent</span>
                            <span className="unread">{this.sentUnreadCount ? this.sentUnreadCount : ''}</span>
                        </NavLink>
                    </div>
                    <div className="drafts">
                        <NavLink to="/mail/draft" >
                            <span>Drafts</span>
                            <span className="unread">{this.draftUnreadCount ? this.draftUnreadCount : ''}</span>
                        </NavLink>
                    </div>
                    <div className="trash">
                        <NavLink to="/mail/trash" >
                            <span>Trash</span>
                            <span className="unread">{this.trashUnreadCount ? this.trashUnreadCount : ''}</span>
                        </NavLink>
                    </div>
                </div>
            </div>
        )
    }
}