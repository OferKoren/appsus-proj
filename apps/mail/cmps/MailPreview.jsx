const { useNavigate } = ReactRouterDOM

export function MailPreview({ mail, onRemoveMail, onToggleReadStatus, onToggleStar }) {
    const { id, from, subject, body, isRead, isStarred, date, to } = mail
    const navigate = useNavigate()
    const previewLength = 50

    function handleClick() {
        if (!isRead) {
            onToggleReadStatus(id)
        }
        navigate(`/mail/${id}`)
    }
    return (
        <div className={`mail-preview ${isRead ? 'read' : 'unread'}`}>
            <button
                className={`star-btn ${isStarred ? 'starred' : ''}`}
                onClick={(ev) => {
                    ev.stopPropagation()
                    onToggleStar(id)
                }}
            >
                <i className={`fa-star ${isStarred ? 'fa' : 'fa-regular'}`}></i>
            </button>
            <span className="mail-from" onClick={handleClick}>{from}</span>
            <span className="mail-subject" onClick={handleClick}>
                {subject.length > 25 ? `${subject.slice(0, 25)}...` : subject}
            </span>
            <span className="mail-body" onClick={handleClick}>
                {body.length > previewLength ? `${body.slice(0, previewLength)}...` : body}
            </span>
            <span className="mail-date" onClick={handleClick}>{date}</span>
            <button className="toggle-read-status-btn" onClick={(ev) => {
                ev.stopPropagation()
                onToggleReadStatus(id)
            }}>
                {isRead ? <i className="fa-solid fa-envelope-open"></i> : <i className="fa-solid fa-envelope"></i>}
            </button>
            <button className="delete-btn" onClick={(ev) => {
                ev.stopPropagation()
                onRemoveMail(id)
            }}>🗑️</button>
        </div>
    )
}
