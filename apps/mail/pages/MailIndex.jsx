const { useEffect, useState } = React
const { Link, useSearchParams, useLocation } = ReactRouterDOM

import { mailService } from '../services/mail.service.js'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { getTruthyValues } from '../services/util.service.js'
import { MailFilter } from '../cmps/MailFilter.jsx'
import { MailFolderFilter } from '../cmps/MailFolderFilter.jsx'
import { MailList } from '../cmps/MailList.jsx'
import { MailComposeModal } from '../cmps/MailComposeModal.jsx'

export function MailIndex({ rootFilterBy, setApp, noteRef, mailRef }) {
    const [mails, setMails] = useState([])
    const [unreadCount, setUnreadCount] = useState(0)
    const [starCount, setStarCount] = useState(0)
    const [searchParams, setSearchParams] = useSearchParams()
    const location = useLocation()
    const filter = rootFilterBy || { txt: '', status: 'inbox' }
    const [filterBy, setFilterBy] = useState({ ...rootFilterBy })
    const [compose, setCompose] = useState(false)
    const [sortCriteria, setSortCriteria] = useState('date')
    const [draftMail, setDraftMail] = useState(null)
    useEffect(() => {
        if (noteRef.current) setCompose(true)
    }, [noteRef])
    useEffect(() => {
        setFilterBy({ ...rootFilterBy })
    }, [rootFilterBy])

    useEffect(() => {
        setSearchParams(getTruthyValues(filterBy))
        loadMails()
        localStorage.setItem('mailFilterBy', JSON.stringify(filterBy))
    }, [filterBy, sortCriteria])

    useEffect(() => {
        setApp('Mail')
        const savedFilter = JSON.parse(localStorage.getItem('mailFilter'))
        if (savedFilter) setFilterBy(savedFilter)
    }, [])

    useEffect(() => {
        localStorage.setItem('mailFilter', JSON.stringify(filterBy))
    }, [filterBy])

    useEffect(() => {
        const countStars = mails.filter((mail) => mail.isStarred).length
        setStarCount(countStars)
    }, [mails])

    function loadMails() {
        mailService
            .query(filterBy)
            .then((fetchedMails) => {
                const mailsWithFormattedDate = fetchedMails.map((mail) => ({
                    ...mail,
                    id: mail.id || Date.now().toString(),
                    date: new Date(mail.sentAt).toLocaleString(),
                }))

                const filteredMails =
                    filterBy.status === 'starred'
                        ? mailsWithFormattedDate.filter((mail) => mail.isStarred)
                        : filterBy.status === 'draft'
                        ? mailsWithFormattedDate.filter((mail) => mail.isDraft)
                        : mailsWithFormattedDate.filter((mail) => !mail.isDraft)

                const sortedMails = sortMails(filteredMails)

                setMails(sortedMails)

                const unreadCount = fetchedMails.filter((mail) => !mail.isRead && !mail.isDraft).length
                setUnreadCount(unreadCount)
            })
            .catch((err) => {
                showErrorMsg('Failed to load mails')
            })
    }

    function onRemoveMail(mailId) {
        const mail = mails.find((mail) => mail.id === mailId)

        if (filterBy.status === 'trash') {
            mailService
                .removePermanently(mailId)
                .then(() => {
                    setMails((prevMails) => prevMails.filter((mail) => mail.id !== mailId))
                    showSuccessMsg('Mail permanently deleted')
                })
                .catch((err) => console.error('Error deleting mail permanently', err))
        } else {
            mailService
                .moveToTrash(mailId)
                .then(() => {
                    setMails((prevMails) => prevMails.filter((mail) => mail.id !== mailId))
                    showSuccessMsg('Mail moved to Trash')
                })
                .catch((err) => console.error('Error moving mail to trash', err))
        }
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
                setUnreadCount((prev) => mails.filter((mail) => !mail.isRead && mail.id !== mailId).length)
            })
            .catch((err) => console.error('Error toggling read status:', err))
    }

    function onToggleStar(mailId) {
        mailService
            .toggleStarStatus(mailId)
            .then((updatedMail) => {
                setMails((prevMails) => {
                    const idx = prevMails.findIndex((mail) => mail.id === mailId)
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
            isDraft: false,
            isSent: true,
        }
        // if(mail.isDraft){
        //     setMails((prevMails) => {
        //         const updatedMails = prevMails.filter(m => m.id !== mail.id)
        //         console.log(updatedMails, 'updatedMails');

        //         const mailWithDate = { ...res, date: new Date(res.sentAt).toLocaleString() }
        //         const savedTest = [mailWithDate, ...updatedMails]

        //         return savedTest
        //     })

        // }
        // mail.isDraft = false
        mailService
            .add(newMail)
            .then((res) => {
                setCompose(false)

                setMails((prevMails) => {
                    const updatedMails = prevMails.filter((m) => m.id !== mail.id)
                    const mailWithDate = { ...res, date: new Date(res.sentAt).toLocaleString() }
                    const savedTest = [mailWithDate, ...updatedMails]
                    console.log('setMails  savedTest:', savedTest)

                    return savedTest
                })

                showSuccessMsg('Mail sent successfully')
            })
            .catch((err) => {
                console.error('Failed to send mail:', err)
                showErrorMsg('Failed to send mail')
            })
    }

    function onSaveDraft(mail) {
        const existingDraftIndex = mails.findIndex((existingMail) => existingMail.id === mail.id)

        if (existingDraftIndex !== -1) {
            const updatedMails = [...mails]
            updatedMails[existingDraftIndex] = {
                ...mail,
                sentAt: Date.now(),
                isDraft: true,
            }
            setMails(updatedMails)
            mailService.saveDraft(updatedMails[existingDraftIndex])
        } else {
            const draftMail = {
                ...mail,
                id: mail.id,
                from: 'user@appsus.com',
                sentAt: Date.now(),
                isDraft: true,
            }

            setMails((prevMails) => [...prevMails, draftMail])
            mailService.saveDraft(draftMail)
        }

        showSuccessMsg('Draft saved successfully')
    }

    function onEditDraft(mail) {
        setDraftMail(mail)
        setCompose(true)
    }

    if (!mails) return <h1>Loading...</h1>
    return (
        <section className="mail-index full">
            <aside className="mail-sidebar">
                <button onClick={() => setCompose(true)} className="compose-btn">
                    <i className="fa-solid fa-pen"></i> Compose
                </button>
                <hr className="sidebar-separator" />
                <MailFolderFilter onSetFilterBy={onSetFilterBy} unreadCount={unreadCount} starCount={starCount} />
            </aside>
            <main className="mail-main-content">
                <div className="sort-buttons">
                    <button className={sortCriteria === 'date' ? 'active' : ''} onClick={() => setSortCriteria('date')}>
                        Date
                    </button>
                    <button className={sortCriteria === 'subject' ? 'active' : ''} onClick={() => setSortCriteria('subject')}>
                        Title
                    </button>
                    <button className={sortCriteria === 'all' ? 'active' : ''} onClick={() => setSortCriteria('all')}>
                        All
                    </button>
                </div>
                {/* <MailFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} /> */}
                <div className="mail-list-container">
                    <MailList
                        mails={mails}
                        onRemoveMail={onRemoveMail}
                        onToggleReadStatus={onToggleReadStatus}
                        onToggleStar={onToggleStar}
                        onEditDraft={onEditDraft}
                    />
                </div>
                {compose && (
                    <MailComposeModal
                        onClose={() => setCompose(() => false)}
                        onSendMail={onSendMail}
                        onSaveDraft={onSaveDraft}
                        draftMail={draftMail}
                        noteRef={noteRef}
                    />
                )}
            </main>
        </section>
    )
}
