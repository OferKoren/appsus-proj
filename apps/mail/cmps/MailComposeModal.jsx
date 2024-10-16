// import { useState } from 'react'
const { useState } = React
import { mailService } from '../services/mail.service.js'

export function MailComposeModal({ onClose, onSendMail }) {
    const [mail, setMail] = useState({ to: '', subject: '', body: '' })

    function handleChange({ target }) {
        const { name, value } = target
        setMail((prevMail) => ({ ...prevMail, [name]: value }))
    }

    /* function onSendMail(ev) {
        ev.preventDefault()

        const newMail = {
            ...mail,
            from: 'user@appsus.com', 
            sentAt: Date.now()
        }

        mailService.add(newMail)
            .then(() => {
                onMailAdded()
                onClose()
            })
            .catch(err => {
                console.error('Failed to send mail:', err)
            })
    } */

    return (
        <div className="mail-compose-modal">
            <div className="modal-content">
                <button className="close-btn" onClick={onClose}>
                    ✖
                </button>
                <h2>Compose Mail</h2>
                <form onSubmit={(ev) => onSendMail(ev, mail)}>
                    <label>
                        To:
                        <input type="email" name="to" value={mail.to} onChange={handleChange} required />
                    </label>
                    <label>
                        Subject:
                        <input type="text" name="subject" value={mail.subject} onChange={handleChange} required />
                    </label>
                    <label>
                        Body:
                        <textarea name="body" value={mail.body} onChange={handleChange} required></textarea>
                    </label>
                    <button type="submit">Send</button>
                </form>
            </div>
        </div>
    )
}
