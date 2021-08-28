import { MailPreview } from './mail-preview.jsx'

export function MailList({ mails, onMoveMailToTrash,toggleMailIsRead,
  pathName, onRemoveMail, restoreMail, toggleMailIsStarred, func, setComposeMode }) {

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
      {mails.map(mail => <MailPreview key={mail.id} mail={mail} onMoveMailToTrash={onMoveMailToTrash}
        toggleMailIsRead={toggleMailIsRead} pathName={pathName} onRemoveMail={onRemoveMail}
        func={func} restoreMail={restoreMail} toggleMailIsStarred={toggleMailIsStarred}
        setComposeMode={setComposeMode}/>)}
    </div>
  )
}