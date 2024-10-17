const { useEffect, useState } = React
const { useParams, useNavigate } = ReactRouterDOM
import { mailService } from '../services/mail.service.js'

export function MailDetails() {
    const [mail, setMail] = useState(null)
    const { mailId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadMail()
        markAsRead()
    }, [mailId])

    function loadMail() {
        mailService.getById(mailId)
            .then(mail => {
                mail.date = new Date(mail.sentAt).toLocaleString() 
                setMail(mail)
            })
            .catch(err => {
                console.error('Failed to load mail', err)
                navigate('/mail')
            })
    }

    function markAsRead() {
        mailService.toggleReadStatus(mailId, true) 
            .then((mail) => {
                console.log(mail , 'Mail marked as read')
            })
            .catch(err => {
                console.error('Failed to mark mail as read', err)
            })
    }


    if (!mail) return <div>Loading...</div>

    return (
        <section className="mail-details">
            <button onClick={() => navigate('/mail')}>Back to List</button>
            <h2>{mail.subject}</h2>
            <p><strong>From:</strong> {mail.from}</p>
            <p><strong>To:</strong> {mail.to}</p>
            <p><strong>Date:</strong> {mail.date}</p>
            <hr />
            <p>{mail.body}</p>
        </section>
    )
}
