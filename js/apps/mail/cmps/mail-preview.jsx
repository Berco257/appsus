const { Link } = ReactRouterDOM

export function MailPreview({ mail, onMoveMailToTrash, toggleMailIsRead, pathName,
    onRemoveMail, restoreMail, toggleMailIsStarred, func, setComposeMode }) {

    const getDate = () => {
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const year = new Date(mail.sentAt).getFullYear()
        const currYear = new Date().getFullYear()
        const month = monthNames[new Date(mail.sentAt).getMonth()]
        const currMonth = monthNames[new Date().getMonth()]
        const day = new Date(mail.sentAt).getDate()
        const currDay = new Date().getDate()
        if (year === currYear && month === currMonth && day === currDay) {
            let hours = new Date(mail.sentAt).getHours()
            hours = hours < 10 ? `0${hours}` : hours;
            let minutes = new Date(mail.sentAt).getMinutes()
            minutes = minutes < 10 ? `0${minutes}` : minutes;
            if (hours >= 0 && hours < 12) return `${hours}:${minutes} am`
            else return `${hours}:${minutes} pm`
        }
        const date = `${month} ${day}`
        return date
    }

    const folder = pathName.split("/")[2]
    const link = folder === 'draft' ? null : `${pathName}/${mail.id}`
    const action = folder === 'draft' ? () => setComposeMode(true, mail.id) : ''
    return (
        <article className={`mail-preview ${!mail.isRead ? "bold" : ""} ${folder === 'trash' ? "line-through" : ""}`}>
            <div className="mail-preview-wrapper">
                <div className={`star ${mail.isStarred ? 'active' : ''}`} onClick={() => toggleMailIsStarred(mail.id)}></div>
                <Link to={link} onClick={action}>
                    <div className="from-to">
                        {mail.dir === 'out' && folder != 'inbox' ?
                            (`To: ${mail.to.fullname}`) :
                            (mail.from.fullname)}
                    </div>
                </Link>
                <div className="subject">
                    <Link to={link} onClick={action}>
                        {mail.subject}<span> - {mail.body}</span>
                    </Link>
                </div>
                <div className="date-wrapper">
                    <Link to={link} onClick={action}>
                        {getDate()}
                    </Link>
                </div>
                <div className={`action ${folder === 'trash' ? "mw120" : ""}`}>
                    {folder === 'trash' ?
                        <div onClick={() => onRemoveMail(mail.id, func)}>
                            <img src="./img/apps/mail/remove.png" />
                        </div> :
                        <div onClick={() => onMoveMailToTrash(mail.id, func)}>
                            <img src="./img/apps/mail/trash.png" />
                        </div>}

                    <div onClick={() => toggleMailIsRead(mail.id)}>
                        {mail.isRead ?
                            <img src="./img/apps/mail/markunread.png" /> :
                            <img src="./img/apps/mail/markread.png" />}
                    </div>

                    {folder === 'trash' &&
                        <div onClick={() => restoreMail(mail.id)}>
                            <img src="./img/apps/mail/restore.png" />
                        </div>}
                </div>
            </div>
        </article>
    )
}