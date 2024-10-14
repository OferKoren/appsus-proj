const { useNavigate } = ReactRouterDOM

export function MailPreview({ mail, onRemoveMail }) {
    const { from, subject, body, isRead, date } = mail
    const navigate = useNavigate()
    const previewLength = 50

    return (
        <div className={`mail-preview ${isRead ? 'read' : 'unread'}`} onClick={() => navigate(`/mail/${mail.id}`)}>
            <span className="mail-from">{from}</span>
            <span className="mail-subject">
                {subject.length > 25 ? `${subject.slice(0, 25)}...` : subject}
            </span>
            <span className="mail-body">
                {body.length > previewLength ? `${body.slice(0, previewLength)}...` : body}
            </span>
            <span className="mail-date">{date}</span>
            <button className="delete-btn" onClick={(ev) => {
                ev.stopPropagation()
                onRemoveMail(mail.id)
            }}>🗑️</button>
        </div>
    )
}
