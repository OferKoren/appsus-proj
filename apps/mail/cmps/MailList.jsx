import { MailPreview } from './MailPreview.jsx'

export function MailList({ mails, onRemoveMail, onToggleReadStatus, onToggleStar, onEditDraft, mailRef }) {
    return (
        <div className="mail-list">
            {mails.map(mail => (
                <MailPreview
                    key={mail.id}
                    mail={mail}
                    onRemoveMail={onRemoveMail}
                    onToggleReadStatus={onToggleReadStatus}
                    onToggleStar={onToggleStar}
                    onEditDraft={onEditDraft}
                    mailRef={mailRef}
                />
            ))}
        </div>
    )
}
