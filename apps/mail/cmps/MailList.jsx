const { useEffect, useState } = React
const { Link, useSearchParams } = ReactRouterDOM

export function MailList({ mails, onRemoveMail }) {
    if (!mails || mails.length === 0) return <div>No mails to display.</div>
    
    return (
        <ul className="mail-list">
            {mails.map(mail => (
                <li key={mail.id} className="mail-item">
                    <h2>{mail.subject}</h2>
                    <p>{mail.body}</p>
                    <span>{mail.isRead ? 'Read' : 'Unread'}</span>
                    <button onClick={() => onRemoveMail(mail.id)}>Delete</button>
                </li>
            ))}
        </ul>
    )
}
