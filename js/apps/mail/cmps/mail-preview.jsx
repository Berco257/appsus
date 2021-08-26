const { Link } = ReactRouterDOM

export function MailPreview({ mail, moveMailToTrash, toggleMailIsRead }) {
    const getDate = () => {
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const year = new Date(mail.sentAt).getYear()
        const currYear = new Date().getYear()
        const month = monthNames[new Date(mail.sentAt).getMonth()]
        const currMonth = monthNames[new Date().getMonth()]
        const day = new Date(mail.sentAt).getDate()
        const currDay = new Date().getDate()
        if (year === currYear && month === currMonth && day === currDay) {
            const hours = new Date(mail.sentAt).getHours()
            const minutes = new Date(mail.sentAt).getMinutes()
            if (hours >= 0 && hours < 12) return `hours:minutes am`
            else return `hours:minutes pm`
        }
        const date = `${month} ${day}`
        return date
    }

    return (
        <article className={`mail-preview ${!mail.isRead ? "bold" : ""}`}>
            {/* <Link to={`/mail/${mail.id}`} > */}
            <div className="mail-preview-wrapper">
                <Link to={`/mail/${mail.id}`} ><div>{mail.from[0]}</div></Link>
                <div><Link to={`/mail/${mail.id}`} >{mail.subject}<span> - {mail.body}</span></Link></div>
                <div><Link to={`/mail/${mail.id}`} >{getDate()}</Link></div>
                <div className="action">
                    <div onClick={() => moveMailToTrash(mail.id)}><img src="./img/apps/mail/trash.png" /></div>
                    <div onClick={() => toggleMailIsRead(mail.id)}>{mail.isRead ? <img src="./img/apps/mail/markunread.png" /> : <img src="./img/apps/mail/markread.png" />}</div>
                </div>
            </div>
            {/* </Link> */}
        </article>
    )
}