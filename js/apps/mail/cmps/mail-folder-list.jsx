const { NavLink } = ReactRouterDOM
import { mailService } from '../services/mail.service.js'

export class MailFolderList extends React.Component {
    state = {
        menuMode: false
    }



    toggle
    toggleMenu = () => {
        this.setState({ menuMode: !this.state.menuMode }, () => {
        })
    }

    render() {
        const inboxUnreadCount = mailService.getUnreadMailsCount('inbox')
        const starredUnreadCount = mailService.getUnreadMailsCount('starred')
        const sentUnreadCount = mailService.getUnreadMailsCount('sent')
        const draftUnreadCount = mailService.getUnreadMailsCount('draft')
        const trashUnreadCount = mailService.getUnreadMailsCount('trash')
        return (
            <div className="mail-folder-list">
                <div className={`open-menu ${this.state.menuMode ? 'active' : ''}`} onClick={this.toggleMenu}>≡</div>
                <div className="list-wrapper">
                    <div className="inbox">
                        <NavLink to="/mail/inbox" >
                            <span>Inbox</span>
                            <span className="unread">{inboxUnreadCount ? inboxUnreadCount : ''}</span>
                        </NavLink>
                    </div>
                    <div className="starred">
                        <NavLink to="/mail/starred" >
                            <span>Starred</span>
                            <span className="unread">{starredUnreadCount ? starredUnreadCount : ''}</span>
                        </NavLink>
                    </div>
                    <div className="sent">
                        <NavLink to="/mail/sent" >
                            <span>Sent</span>
                            <span className="unread">{sentUnreadCount ? sentUnreadCount : ''}</span>
                        </NavLink>
                    </div>
                    <div className="drafts">
                        <NavLink to="/mail/draft" >
                            <span>Drafts</span>
                            <span className="unread">{draftUnreadCount ? draftUnreadCount : ''}</span>
                        </NavLink>
                    </div>
                    <div className="trash">
                        <NavLink to="/mail/trash" >
                            <span>Trash</span>
                            <span className="unread">{trashUnreadCount ? trashUnreadCount : ''}</span>
                        </NavLink>
                    </div>
                </div>
            </div>
        )
    }
}