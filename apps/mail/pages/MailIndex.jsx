const { useEffect, useState } = React
const { Link, useSearchParams, useLocation } = ReactRouterDOM


import { mailService } from '../services/mail.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { getTruthyValues } from '../services/util.service.js'
import { MailFilter } from '../cmps/MailFilter.jsx'
import { MailFolderFilter } from '../cmps/MailFolderFilter.jsx'
import { MailList } from '../cmps/MailList.jsx'
import { MailComposeModal } from '../cmps/MailComposeModal.jsx'

export function MailIndex({ rootFilterBy }) {
    const [mails, setMails] = useState([])
    const [unreadCount, setUnreadCount] = useState(0)
    const [starCount, setStarCount] = useState(0)
    const [searchParams, setSearchParams] = useSearchParams()
    const location = useLocation()
    const filter = rootFilterBy || { txt: '', status: 'inbox' }
    const [filterBy, setFilterBy] = useState({ ...rootFilterBy })
    const [compose, setCompose] = useState(false)
    const [sortCriteria, setSortCriteria] = useState('date')

    
    useEffect(() => {
        setFilterBy({ ...rootFilterBy })
    }, [rootFilterBy])

        useEffect(() => {
            setSearchParams(getTruthyValues(filterBy))
            loadMails()
            localStorage.setItem('mailFilterBy', JSON.stringify(filterBy))
        }, [filterBy, sortCriteria])

        useEffect(() => {
            const savedFilter = JSON.parse(localStorage.getItem('mailFilter'))
            if (savedFilter) setFilterBy(savedFilter)
        }, [])
        
        useEffect(() => {
            localStorage.setItem('mailFilter', JSON.stringify(filterBy))
        }, [filterBy])

        useEffect(() => {
            const countStars = mails.filter(mail => mail.isStarred).length
            setStarCount(countStars)
        }, [mails]) 

    function loadMails() {
        mailService.query(filterBy)
            .then((fetchedMails) => {
                const mailsWithFormattedDate = fetchedMails.map((mail) => ({
                    ...mail,
                    date: new Date(mail.sentAt).toLocaleString(),
                }))

                // mailsWithFormattedDate = sortMails(mailsWithFormattedDate)

                const filteredMails = filterBy.status === 'starred' 
                    ? mailsWithFormattedDate.filter(mail => mail.isStarred)
                    : mailsWithFormattedDate
    
                setMails(filteredMails) 
                const count = fetchedMails.filter(mail => !mail.isRead).length
                setUnreadCount(count)
            })
            .catch((err) => {
                showErrorMsg('Failed to load mails')
            })
    }
    function onRemoveMail(mailId) {
        mailService
            .remove(mailId)
            .then(() => {
                setMails((mails) => mails.filter((mail) => mail.id !== mailId))
                setUnreadCount(prev => mails.filter(mail => !mail.isRead && mail.id !== mailId).length)
            })
            .catch((err) => {
                console.error('Error deleting mail:', err)
            })
    }
    
    function sortMails(mails) {
        return [...mails].sort((a, b) => {
            if (sortCriteria === 'date') {
                return new Date(b.sentAt) - new Date(a.sentAt)
            } else if (sortCriteria === 'subject') {
                return a.subject.localeCompare(b.subject)
            } else if (sortCriteria === 'all') {
                return a.subject.localeCompare(b.subject) || new Date(b.sentAt) - new Date(a.sentAt)
            }
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
                setUnreadCount(prev => mails.filter(mail => !mail.isRead && mail.id !== mailId).length)
            })
            .catch((err) => console.error('Error toggling read status:', err))
    }

    function onToggleStar(mailId) {
        mailService.toggleStarStatus(mailId)
            .then((updatedMail) => {
                setMails((prevMails) => {
                    const idx = prevMails.findIndex(mail => mail.id === mailId)
                    const newMails = [...prevMails]
                    if (idx >= 0) newMails.splice(idx, 1, updatedMail)
                    showSuccessMsg('Mail starred status updated')
                    return newMails
                })
            })
            .catch((err) => console.error('Error toggling star status:', err))
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
        <section className="mail-index full">
            <aside className="mail-sidebar">
                <button onClick={() => setCompose(true)} className="compose-btn">
                    <i className="fa-solid fa-pen"></i> Compose
                </button>
                <hr className="sidebar-separator" />
                <MailFolderFilter onSetFilterBy={onSetFilterBy} unreadCount={unreadCount} starCount={starCount}/>
            </aside>
            <main className="mail-main-content">
                <div className="sort-buttons">
                    <button className={sortCriteria === 'date' ? 'active' : ''} onClick={() => setSortCriteria('date')}>Date</button>
                    <button className={sortCriteria === 'subject' ? 'active' : ''} onClick={() => setSortCriteria('subject')}>Subject</button>
                    <button className={sortCriteria === 'all' ? 'active' : ''} onClick={() => setSortCriteria('all')}>All</button>
                </div>
                <MailFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
                <div className="mail-list-container">
                    <MailList mails={mails} onRemoveMail={onRemoveMail} onToggleReadStatus={onToggleReadStatus} onToggleStar={onToggleStar}/>
                </div>
                {compose && (
                    <MailComposeModal onClose={() => setCompose(() => false)} onSendMail={onSendMail} />
                )}
            </main>
        </section>
    )
}