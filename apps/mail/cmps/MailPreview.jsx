const { useNavigate } = ReactRouterDOM

export function MailPreview({ mail }) {
    const { from, subject, isRead, date } = mail
    const navigate = useNavigate()

    return (
        <div
            className={`mail-preview ${isRead ? 'read' : 'unread'}`}
            onClick={() => navigate(`/mail/${mail.id}`)}
        >
            <span className="mail-from">{from}</span>
            <span className="mail-subject">
                {subject.length > 25 ? `${subject.slice(0, 25)}...` : subject}
            </span>
            <span className="mail-date">{date}</span>
        </div>
    )
}
