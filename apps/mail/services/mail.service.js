import { storageService } from './storage.service.js'
import { asyncStorageService } from './async-storage.service.js'


export const mailService = {
    query,
    remove,
    getById,
    add,
    getFilterFromSearchParams,
    toggleReadStatus
    

}


const MAIL_KEY = 'mailDB'
const loggedinUser = { 
    email: 'user@appsus.com', 
    fullname: 'Mahatma Appsus' 
}

let mails = storageService.loadFromStorage(MAIL_KEY) || _createMails()
storageService.saveToStorage(MAIL_KEY, mails)

function query(filterBy = {}) {
    return Promise.resolve()
        .then(() => {
            let filteredMails = mails

            if (filterBy.status) {
                if (filterBy.status === 'inbox') {
                    filteredMails = filteredMails.filter(mail => mail.to === loggedinUser.email)
                } else if (filterBy.status === 'sent') {
                    filteredMails = filteredMails.filter(mail => mail.from === loggedinUser.email)
                } else if (filterBy.status === 'trash') {
                    filteredMails = filteredMails.filter(mail => mail.removedAt)
                } else if (filterBy.status === 'draft') {
                    filteredMails = filteredMails.filter(mail => !mail.sentAt)
                }
            }

            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                filteredMails = filteredMails.filter(mail => regExp.test(mail.subject) || regExp.test(mail.body))
            }

            if (filterBy.isRead !== undefined) {
                filteredMails = filteredMails.filter(mail => mail.isRead === filterBy.isRead)
            }

            if (filterBy.isStared !== undefined) {
                filteredMails = filteredMails.filter(mail => mail.isStared === filterBy.isStared)
            }

            if (filterBy.labels && filterBy.labels.length) {
                filteredMails = filteredMails.filter(mail => 
                    filterBy.labels.some(label => mail.labels && mail.labels.includes(label))
                )
            }

            return filteredMails
        })
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

function getById(mailId) {
    return asyncStorageService.get(MAIL_KEY, mailId)
}

function add(mail) {
    return asyncStorageService.post(MAIL_KEY, mail)
}

function remove(mailId) {
    return asyncStorageService.remove(MAIL_KEY, mailId)
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

function toggleReadStatus(mailId) {
    return asyncStorageService.get(MAIL_KEY, mailId).then(mail => {
    mail.isRead = !mail.isRead 
console.log(asyncStorageService.put(MAIL_KEY, mail))

    return asyncStorageService.put(MAIL_KEY, mail)
    
    })
}

