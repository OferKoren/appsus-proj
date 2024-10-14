export function MailPreview({ mail }) {
    const { from, subject, isRead, date } = mail

    return (
        <div className={`mail-preview ${isRead ? 'read' : 'unread'}`}>
            <span className="mail-from">{from}</span>
            <span className="mail-subject">
                {subject.length > 25 ? `${subject.slice(0, 25)}...` : subject}
            </span>
            <span className="mail-date">{date}</span>
        </div>
    )
}
