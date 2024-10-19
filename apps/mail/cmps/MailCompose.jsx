const { useState } = React
const { useNavigate } = ReactRouterDOM
import { mailService } from '../services/mail.service.js'

export function MailCompose() {
    const [mail, setMail] = useState({ to: '', subject: '', body: '' })
    const [isMailSent, setIsMailSent] = useState(false) 
    const navigate = useNavigate()

    function handleChange({ target }) {
        const { name, value } = target
        setMail(prevMail => ({ ...prevMail, [name]: value }))
    }

    // function onSendMail(ev) {
    //     ev.preventDefault()
    //     if(isMailSent) return
    //     setIsMailSent(true)
    
       
    //     const newMail = {
    //         ...mail,
    //         from: 'user@appsus.com',
    //         sentAt: Date.now(),
    //         isDraft: false 
    //     }
    //     console.log("new mail MailCompose")
    //     mailService.add(newMail)
    //         .then(() => {
    //             showSuccessMsg('Mail sent successfully')
    //             navigate('/mail', { state: { hasMailsChanged: true } })
    //         })
    //         .catch(err => {
    //             console.error('Failed to send mail:', err)
    //             showErrorMsg('Failed to send mail')
    //         })
    // }
    

    return (
        <section className="mail-compose">
            <h2>Compose Mail</h2>
            <form onSubmit={onSendMail}>
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
        </section>
    )
}
