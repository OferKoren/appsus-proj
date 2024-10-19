import { MailPreview } from './MailPreview.jsx'

export function MailList({ mails, onRemoveMail, onToggleReadStatus, onToggleStar, onEditDraft }) {
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
                />
            ))}
        </div>
    )
}
