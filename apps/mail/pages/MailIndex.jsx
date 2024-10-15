const { useEffect, useState } = React
const { Link, useSearchParams, useNavigate } = ReactRouterDOM

import { mailService } from '../services/mail.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { getTruthyValues } from '../services/util.service.js'
import { MailFilter } from '../cmps/MailFilter.jsx'
import { MailFolderFilter } from '../cmps/MailFolderFilter.jsx'
import { MailList } from '../cmps/MailList.jsx'



export function MailIndex({ rootFilterBy }) {
    const [mails, setMails] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()
    // const filter = rootFilterBy || { txt: '', status: 'inbox' }
    const [filterBy, setFilterBy] = useState({ ...rootFilterBy })
    useEffect(() => {
        setFilterBy({ ...rootFilterBy })
    }, [rootFilterBy])
    /*    const [filterBy, setFilterBy] = useState({
        txt: '',
        status: 'inbox',
    }) */
    useEffect(() => {
        console.log(MailFolderFilter)
        setSearchParams(getTruthyValues(filterBy))
        loadMails()
    }, [filterBy])

    function loadMails() {
        mailService
            .query(filterBy)
            .then((fetchedMails) => {
                const mailsWithFormattedDate = fetchedMails.map((mail) => ({
                    ...mail,
                    date: new Date(mail.sentAt).toLocaleString(),
                }))
                setMails(mailsWithFormattedDate)
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

    if (!mails) return <h1>Loading...</h1>
    return (
        <section className="mail-index">
            <aside className="mail-sidebar">
                <Link to="/mail/compose" className="compose-btn">
                    <i className="fa-solid fa-pen"></i> Compose
                </Link>
                <hr className="sidebar-separator" />
                <MailFolderFilter onSetFilterBy={onSetFilterBy} />
            </aside>
            <main className="mail-main-content">
                <MailFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
                <div className="mail-list-container">
                    <MailList mails={mails} onRemoveMail={onRemoveMail} />
                </div>
            </main>
        </section>
    )
}
