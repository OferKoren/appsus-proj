const { useState, useEffect } = React

export function MailComposeModal({ onClose, onSendMail, onSaveDraft,draftMail }) {
    const [mail, setMail] = useState(draftMail || { to: '', subject: '', body: '' })
    const [isDraftSaved, setIsDraftSaved] = useState(false)

    function handleChange({ target }) {
        const { name, value } = target
        setMail((prevMail) => ({ ...prevMail, [name]: value }))
    }

    function handleSubmit(ev) {
        ev.preventDefault()
        onSendMail(ev, mail)
    }

    function handleClose() {
        if (mail.subject || mail.body || mail.to) {
            const draftMail = {
                ...mail,
                isDraft: true,
                sentAt: Date.now(), 
                status: 'draft' 
            }
            onSaveDraft(draftMail)
            setIsDraftSaved(true)
        }
        onClose()
    }

    return (
        <section className="mail-compose-modal">
            <div className="modal-content">
                <button className="close-btn" onClick={handleClose}>X</button>
                <form onSubmit={handleSubmit}>
                    <input
                        type="email"
                        name="to"
                        placeholder="To"
                        value={mail.to}
                        onChange={handleChange}
                    />
                    <input
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        value={mail.subject}
                        onChange={handleChange}
                    />
                    <textarea
                        name="body"
                        placeholder="Body"
                        value={mail.body}
                        onChange={handleChange}
                    ></textarea>
                    <button type="submit">Send</button>
                </form>
            </div>
        </section>
    )
}

