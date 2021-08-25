const { Link } = ReactRouterDOM

export function MailPreview({ mail }) {
    return (
        <article className="mail-preview">

            <Link to={`/mail/${mail.id}`} >{mail.subject}</Link>
        </article>
    )
}