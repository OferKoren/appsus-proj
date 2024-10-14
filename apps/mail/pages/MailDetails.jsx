// MailDetails.jsx
const { useEffect, useState } = React
const { useParams, useNavigate } = ReactRouterDOM
import { mailService } from '../services/mail.service.js'

export function MailDetails() {
    const [mail, setMail] = useState(null)
    const { mailId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadMail()
    }, [mailId])

    function loadMail() {
        mailService.getById(mailId).then(setMail).catch(err => {
            console.log('Error loading mail:', err)
            navigate('/mail') 
        })
    }

    if (!mail) return <div>Loading...</div>

    return (
        <section className="mail-details">
            <button onClick={() => navigate('/mail')}>Back to Inbox</button>
            <h2>{mail.subject}</h2>
            <p><strong>From:</strong> {mail.from}</p>
            <p><strong>To:</strong> {mail.to}</p>
            <p><strong>Date:</strong> {mail.date}</p>
            <hr />
            <p>{mail.body}</p>
        </section>
    )
}
