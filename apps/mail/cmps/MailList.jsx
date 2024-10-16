import { MailPreview } from './MailPreview.jsx'

export function MailList({ mails, onRemoveMail,  onToggleReadStatus}) {
    return (
        <div className="mail-list">
            {mails.map(mail => (
                <MailPreview key={mail.id} 
                mail={mail} 
                onRemoveMail={onRemoveMail} 
                onToggleReadStatus={onToggleReadStatus}
                />
            ))}
        </div>
    )
}
