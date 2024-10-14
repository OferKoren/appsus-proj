const { useNavigate } = ReactRouterDOM

export function MailPreview({ mail, onRemoveMail }) {
    const { from, subject, isRead, date } = mail
    const navigate = useNavigate()

    
    return (
        <div className={`mail-preview ${isRead ? 'read' : 'unread'}`}>
            <span className="mail-from" onClick={() => navigate(`/mail/${mail.id}`)}>{from}</span>
            <span className="mail-subject" onClick={() => navigate(`/mail/${mail.id}`)}>
                {subject.length > 25 ? `${subject.slice(0, 25)}...` : subject}
            </span>
            <span className="mail-date">{date}</span>
            <button className="delete-btn" onClick={() => onRemoveMail(mail.id)}>
                🗑️
            </button>
        </div>
    )
}