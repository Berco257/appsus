import { MailPreview } from './mail-preview.jsx'

export function MailList({ mails }) {
  return (
    <div className="mail-list">
      {mails.map(mail => <MailPreview key={mail.id} mail={mail} />)}
    </div>
  )
}