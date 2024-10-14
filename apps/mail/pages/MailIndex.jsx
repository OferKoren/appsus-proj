const { useEffect, useState } = React
const { Link, useSearchParams, useNavigate } = ReactRouterDOM

import { mailService } from '../services/mail.service.js'
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { getTruthyValues } from '../services/util.service.js'
import { MailFilter } from '../cmps/MailFilter.jsx'
import { MailFolderFilter } from '../cmps/MailFolderFilter.jsx'
import { MailList } from '../cmps/MailList.jsx'

export function MailIndex() {
    const [mails, setMails] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(mailService.getFilterFromSearchParams(searchParams))

    useEffect(() => {
        setSearchParams(getTruthyValues(filterBy))
        loadMails()
    }, [filterBy])

    function loadMails() {
        mailService.query()
            .then(fetchedMails => {
                const mailsWithFormattedDate = fetchedMails.map(mail => ({
                    ...mail,
                    date: new Date(mail.sentAt).toLocaleString() 
                }))
                setMails(mailsWithFormattedDate)
                
            })
            .catch(err => {
                console.error('Error loading mails:', err)
                showErrorMsg('Failed to load mails')
            })
    }

    function onRemoveMail(mailId) {
        mailService.remove(mailId).then(() => {
            setMails(mails => mails.filter(mail => mail.id !== mailId))
        }).catch(err => {
            console.error('Error deleting mail:', err)
        })
    }

    function onSetFilterBy(newFilter) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...newFilter }))
    }

    if (!mails) return <h1>Loading...</h1>

    return (
        <section className="mail-index">
            <MailFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
            <section className="main-content">
                <MailFolderFilter onSetFilterBy={onSetFilterBy} />
                <div className="mail-list-container">
                    <Link to="/mail/compose">Compose Mail</Link>
                    <MailList
                        mails={mails}
                        onRemoveMail={onRemoveMail}
                    />
                </div>
            </section>
        </section>
    )
}
