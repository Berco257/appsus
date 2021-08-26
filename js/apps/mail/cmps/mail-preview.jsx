const { Link } = ReactRouterDOM

export function MailPreview({ mail }) {
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
        <article className="mail-preview">
            <Link to={`/mail/${mail.id}`} >
                <div>{mail.from[0]}</div>
                <div>{mail.subject}<span> - {mail.body}</span> </div>
                <div>{getDate()}</div>
            </Link>
        </article>
    )
}