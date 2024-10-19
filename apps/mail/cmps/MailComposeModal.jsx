const { useState, useEffect } = React

export function MailComposeModal({ onClose, onSendMail, onSaveDraft, draftMail, noteRef }) {
    let initMail = {}
    if (noteRef.current) {
        console.log('gi')
        initMail = formatNoteToMail(noteRef.current)
    } else initMail = draftMail ? draftMail : { to: '', subject: '', body: '' }
    const [mail, setMail] = useState(initMail)
    const [isDraftSaved, setIsDraftSaved] = useState(false)
    const [isMailSent, setIsMailSent] = useState(false)
    noteRef.current = null
    useEffect(() => {
        return () => {
            if (!isDraftSaved && (mail.subject || mail.body || mail.to)) {
            }
        }
    }, [isDraftSaved, mail])

    function handleChange({ target }) {
        const { name, value } = target
        setMail((prevMail) => ({ ...prevMail, [name]: value }))
    }
    function formatNoteToMail(note) {
        const { info } = note
        const newMail = { to: '', subject: '', body: '' }
        newMail.subject = info.title
        newMail.body = info.txt
        return newMail
    }
    function handleSubmit(ev) {
        ev.preventDefault()
        if (isMailSent) return

        setIsMailSent(true)
        if (isDraftSaved) return
        setIsDraftSaved(true)
        onSendMail(ev, mail)
    }

    function handleClose() {
        if (mail.subject || mail.body || mail.to) {
            const draftMail = {
                ...mail,
                isDraft: true,
                sentAt: Date.now(),
                status: 'draft',
            }
            onSaveDraft(draftMail)
            setIsDraftSaved(true)
        }
        onClose()
    }

    return (
        <section className="mail-compose-modal">
            <div className="modal-content">
                <button className="close-btn" onClick={handleClose}>
                    X
                </button>
                <form onSubmit={handleSubmit}>
                    <input type="email" name="to" placeholder="To" value={mail.to} onChange={handleChange} />
                    <input type="text" name="subject" placeholder="Subject" value={mail.subject} onChange={handleChange} />
                    <textarea name="body" placeholder="Body" value={mail.body} onChange={handleChange}></textarea>
                    <button type="submit">Send</button>
                </form>
            </div>
        </section>
    )
}
