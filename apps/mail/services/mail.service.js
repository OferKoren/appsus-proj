import { storageService } from './storage.service.js'


export const mailService = {
    query,
    remove,
    getById,
    getFilterFromSearchParams,

}


const MAIL_KEY = 'mailDB'
const loggedinUser = { 
    email: 'user@appsus.com', 
    fullname: 'Mahatma Appsus' 
}

let mails = storageService.loadFromStorage(MAIL_KEY) || _createMails()
storageService.saveToStorage(MAIL_KEY, mails)

function query(filterBy = {}) {
    return Promise.resolve(mails.filter(mail => {
        if (filterBy.status) {
            if (filterBy.status === 'inbox' && mail.to !== loggedinUser.email) return false
            if (filterBy.status === 'sent' && mail.from !== loggedinUser.email) return false
            if (filterBy.status === 'trash' && !mail.removedAt) return false
            if (filterBy.status === 'draft' && mail.sentAt) return false
        }

        if (filterBy.txt) {
            const regExp = new RegExp(filterBy.txt, 'i')
            if (!regExp.test(mail.subject) && !regExp.test(mail.body)) return false
        }

        if (filterBy.isRead !== undefined && mail.isRead !== filterBy.isRead) return false
        if (filterBy.isStared !== undefined && mail.isStared !== filterBy.isStared) return false

        if (filterBy.labels && filterBy.labels.length) {
            const hasLabel = filterBy.labels.some(label => mail.labels && mail.labels.includes(label))
            if (!hasLabel) return false
        }

        return true
    }))
}

function remove(mailId) {
    const idx = mails.findIndex(mail => mail.id === mailId)
    if (idx === -1) return Promise.reject('Mail not found')
    mails.splice(idx, 1)
    storageService.saveToStorage(MAIL_KEY, mails)
    return Promise.resolve()
}


function _createMails() {
    return [
        { id: 'e101', subject: 'Miss you!', body: 'Would love to catch up sometime', isRead: false, sentAt: Date.now(), from: 'friend@social.com', to: loggedinUser.email },
        { id: 'e102', subject: 'Meeting Reminder', body: 'Reminder for our meeting tomorrow at 10 AM.', isRead: true, sentAt: Date.now(), from: 'boss@company.com', to: loggedinUser.email },
        { id: 'e103', subject: 'New Linkedin Message', body: 'You have got a new message from : Coding Academy.', isRead: false, sentAt: Date.now(), from: 'jobinterview@coding-academy.com', to: loggedinUser.email },
        { id: 'e104', subject: 'Slack Sign-Up', body: 'Your new Slack account is good to go!.', isRead: true, sentAt: Date.now(), from: 'master@slack.com', to: loggedinUser.email },
        { id: 'e105', subject: 'Discount Offer', body: 'Exclusive discount for you!', isRead: false, sentAt: Date.now(), from: 'promo@service.com', to: loggedinUser.email },
    ]
}

function getById(mailId) {
    return storageService.query(MAIL_KEY).then(mails => {
        const mail = mails.find(mail => mail.id === mailId)
        if (!mail) throw new Error('Mail not found')
        return mail
    })
}

function getFilterFromSearchParams(searchParams) {
    return {
        status: searchParams.get('status') || '',
        txt: searchParams.get('txt') || '',
        isRead: searchParams.has('isRead') ? searchParams.get('isRead') === 'true' : undefined,
        isStared: searchParams.has('isStared') ? searchParams.get('isStared') === 'true' : undefined,
        labels: searchParams.getAll('labels') || []
    }
}
