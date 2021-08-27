const { Link } = ReactRouterDOM

export function MailPreview({ mail, moveMailToTrash, toggleMailIsRead, pathName,
    removeMail, restoreMail, toggleMailIsStarred }) {

    const getDate = () => {
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const year = new Date(mail.sentAt).getFullYear()
        const currYear = new Date().getFullYear()
        const month = monthNames[new Date(mail.sentAt).getMonth()]
        const currMonth = monthNames[new Date().getMonth()]
        const day = new Date(mail.sentAt).getDate()
        const currDay = new Date().getDate()
        if (year === currYear && month === currMonth && day === currDay) {
            const hours = new Date(mail.sentAt).getHours()
            const minutes = new Date(mail.sentAt).getMinutes()
            if (hours >= 0 && hours < 12) return `${hours}:${minutes} am`
            else return `${hours}:${minutes} pm`
        }
        const date = `${month} ${day}`
        return date
    }
    
    const folder = pathName.split("/")[2]
    return (
        <article className={`mail-preview ${!mail.isRead ? "bold" : ""} ${folder === 'trash' ? "line-through" : ""}`}>
            <div className="mail-preview-wrapper">
                <div className={`star ${mail.isStarred ? 'active' : ''}`} onClick={() => toggleMailIsStarred(mail.id)}></div>
                <Link to={`${pathName}/${mail.id}`} >
                    <div className="from-to">
                        {mail.dir === 'out' ?
                            (`To: ${mail.to.fullname}`) :
                            (mail.from.fullname)}
                    </div>
                </Link>
                <div className="subject">
                    <Link to={`${pathName}/${mail.id}`} >
                        {mail.subject}<span> - {mail.body}</span>
                    </Link>
                </div>
                <div className="date-wrapper">
                    <Link to={`${pathName}/${mail.id}`} >
                        {getDate()}
                    </Link>
                </div>
                <div className={`action ${folder === 'trash' ? "mw120" : ""}`}>
                    {folder === 'trash' ?
                        <div onClick={() => removeMail(mail.id)}>
                            <img src="./img/apps/mail/remove.png" />
                        </div> :
                        <div onClick={() => moveMailToTrash(mail.id)}>
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