const { useEffect, useState } = React
const { Link, useSearchParams, useLocation } = ReactRouterDOM

import { mailService } from '../services/mail.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { getTruthyValues } from '../services/util.service.js'
import { MailFilter } from '../cmps/MailFilter.jsx'
import { MailFolderFilter } from '../cmps/MailFolderFilter.jsx'
import { MailList } from '../cmps/MailList.jsx'
import { MailCompose } from '../cmps/MailCompose.jsx'
import { MailComposeModal } from '../cmps/MailComposeModal.jsx'

export function MailIndex({ rootFilterBy }) {
    const [mails, setMails] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()
    const location = useLocation()
    const filter = rootFilterBy || { txt: '', status: 'inbox' }
    const [filterBy, setFilterBy] = useState({ ...rootFilterBy })
    const [compose, setCompose] = useState(false)
    useEffect(() => {
        setFilterBy({ ...rootFilterBy })
    }, [rootFilterBy])
    /*    const [filterBy, setFilterBy] = useState({
        txt: '',
        status: 'inbox',
    }) */
    useEffect(() => {
        setSearchParams(getTruthyValues(filterBy))
        console.log(filterBy)
        loadMails()
    }, [filterBy])

    // useEffect(() => {
    //     console.log("useEffect  location:", location)
    //     if (location.state!=null) {
    //         mailService.query(filterBy).then(x=>{
    //             console.log(x)
    //         })
    //         console.log('Added')
    // }
    // }, [location])

    function loadMails() {
        mailService
            .query(filterBy)
            .then((fetchedMails) => {
                const mailsWithFormattedDate = fetchedMails.map((mail) => ({
                    ...mail,
                    date: new Date(mail.sentAt).toLocaleString(),
                }))
                setMails(mailsWithFormattedDate)
                // console.log(mailsWithFormattedDate, 'mailsWithFormattedDate')
            })
            .catch((err) => {
                console.error('Error loading mails:', err)
                showErrorMsg('Failed to load mails')
            })
    }

    function onRemoveMail(mailId) {
        mailService
            .remove(mailId)
            .then(() => {
                setMails((mails) => mails.filter((mail) => mail.id !== mailId))
            })
            .catch((err) => {
                console.error('Error deleting mail:', err)
            })
    }

    function onSetFilterBy(newFilter) {
        setFilterBy((prevFilter) => ({ ...prevFilter, ...newFilter }))
    }

    function onToggleReadStatus(mailId) {
        console.log(mailService.toggleReadStatus(mailId))
        mailService
            .toggleReadStatus(mailId)
            .then((updatedMail) => {
                setMails((prevMails) => {
                    const idx = prevMails.findIndex((mail) => mail.id === mailId)
                    const newMails = [...prevMails]
                    newMails.splice(idx, 1, updatedMail)
                    return newMails
                })
            })
            .catch((err) => console.error('Error toggling read status:', err))
    }

    function onSendMail(ev, mail) {
        ev.preventDefault()

        const newMail = {
            ...mail,
            from: 'user@appsus.com',
            sentAt: Date.now(),
        }

        mailService
            .add(newMail)
            .then((newMail) => {
                setCompose(() => false)
                setMails((prevMails) => {
                    const mailWithDate = { ...newMail, date: new Date(newMail.sentAt).toLocaleString() }
                    return [mailWithDate, ...prevMails]
                })
            })
            .catch((err) => {
                console.error('Failed to send mail:', err)
            })
    }
    if (!mails) return <h1>Loading...</h1>
    return (
        <section className="mail-index">
            <aside className="mail-sidebar">
                {/* <Link to="/mail/compose" className="compose-btn">
                    <i className="fa-solid fa-pen"></i> Compose
                </Link> */}
                <button onClick={() => setCompose(true)} className="compose-btn">
                    <i className="fa-solid fa-pen"></i> Compose
                </button>
                <hr className="sidebar-separator" />
                <MailFolderFilter onSetFilterBy={onSetFilterBy} />
            </aside>
            <main className="mail-main-content">
                <MailFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
                <div className="mail-list-container">
                    <MailList mails={mails} onRemoveMail={onRemoveMail} onToggleReadStatus={onToggleReadStatus} />
                </div>
                {compose && (
                    <MailComposeModal
                        onClose={() => {
                            setCompose(() => false)
                        }}
                        onSendMail={onSendMail}
                    />
                )}
            </main>
        </section>
    )
}
