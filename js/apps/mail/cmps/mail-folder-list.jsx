const { NavLink } = ReactRouterDOM

export function MailFolderList() {
    return (
        <div className="mail-folder-list">
            <div className="inbox"><NavLink to="/mail/inbox" >Inbox</NavLink></div>
            <div className="starred"><NavLink to="/mail/starred" >Starred</NavLink></div>
            <div className="sent"><NavLink to="/mail/sent" >Sent</NavLink></div>
            <div className="drafts"><NavLink to="/mail/draft" >Drafts</NavLink></div>
            <div className="trash"><NavLink to="/mail/trash" >Trash</NavLink></div>
            
        </div>
    )
}