import { MailPreview } from './mail-preview.jsx'

export function MailList({ mails, moveMailToTrash,toggleMailIsRead,
  pathName, removeMail, restoreMail, toggleMailIsStarred }) {

  if (!mails.length) {
    return (
      <div className="mail-list">
        <div className="empty">
          nothing here...
        </div>
      </div>
    )
  }

  return (
    <div className="mail-list">
      {mails.map(mail => <MailPreview key={mail.id} mail={mail} moveMailToTrash={moveMailToTrash}
        toggleMailIsRead={toggleMailIsRead} pathName={pathName} removeMail={removeMail}
        restoreMail={restoreMail} toggleMailIsStarred={toggleMailIsStarred} />)}
    </div>
  )
}