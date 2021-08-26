import { MailPreview } from './mail-preview.jsx'

export function MailList({ mails, moveMailToTrash, toggleMailIsRead, pathName, removeMail, restoreMail }) {
  return (
    <div className="mail-list">
      {mails.map(mail => <MailPreview key={mail.id} mail={mail} moveMailToTrash={moveMailToTrash}
      toggleMailIsRead={toggleMailIsRead} pathName={pathName}
      removeMail={removeMail} restoreMail={restoreMail} />)}
    </div>
  )
}