import { MailPreview } from './mail-preview.jsx'

export function MailList({ mails, moveMailToTrash, toggleMailIsRead }) {
  return (
    <div className="mail-list">
      {mails.map(mail => <MailPreview key={mail.id} mail={mail} moveMailToTrash={moveMailToTrash} toggleMailIsRead={toggleMailIsRead} />)}
    </div>
  )
}