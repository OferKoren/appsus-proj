import { storageService } from './storage.service.js'
import { asyncStorageService } from './async-storage.service.js'

export const mailService = {
    query,
    remove,
    getById,
    add,
    save,  
    getFilterFromSearchParams,
    toggleReadStatus,
    toggleStarStatus,
    saveDraft
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
                    filteredMails = filteredMails.filter(mail => 
                        (mail.to === loggedinUser.email || mail.from === loggedinUser.email) && !mail.isDraft)
                } else if (filterBy.status === 'sent') {
                    filteredMails = filteredMails.filter(mail => mail.from === loggedinUser.email)
                } else if (filterBy.status === 'trash') {
                    filteredMails = filteredMails.filter(mail => mail.removedAt)
                } else if (filterBy.status === 'draft') {
                    filteredMails = filteredMails.filter(mail => mail.isDraft)
                }
            }

            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                filteredMails = filteredMails.filter(mail => regExp.test(mail.subject) || regExp.test(mail.body))
            }

            if (filterBy.isRead) {
                filteredMails = filteredMails.filter(mail => mail.isRead === filterBy.isRead)
            }

            if (filterBy.isStared) {
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

function save(mail) {
    if (mail.id) {
        return asyncStorageService.put(MAIL_KEY, mail)
    } else {
        return asyncStorageService.post(MAIL_KEY, mail)
    }
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

        { id: 'e106', subject: 'Payment Received', body: 'You have received a payment of $150.00 USD from John Doe. It may take a few minutes for this transaction to appear in your account.', isRead: false, sentAt: Date.now(), from: 'service@paypal.com', to: loggedinUser.email },
        { id: 'e107', subject: 'New Sign-in from Chrome on Windows', body: 'We noticed a new sign-in to your Google Account from a Windows device. If this was you, you can safely disregard this email.', isRead: true, sentAt: Date.now() - 1000000, from: 'no-reply@accounts.google.com', to: loggedinUser.email },
        { id: 'e108', subject: 'PayPal Receipt for Your Payment', body: 'Your payment of $45.00 USD to ABC Store has been completed. It may take a few moments for this transaction to show up on your account.', isRead: false, sentAt: Date.now() - 2000000, from: 'service@paypal.com', to: loggedinUser.email },
        { id: 'e109', subject: 'Security Alert: Suspicious Login Attempt', body: 'Google blocked someone with the password for your account. They used a device that Google could not recognize. Please change your password.', isRead: false, sentAt: Date.now() - 3000000, from: 'security@google.com', to: loggedinUser.email },
        { id: 'e110', subject: 'Payment to Netflix - Receipt', body: 'You have successfully made a payment of $13.99 USD to Netflix. This payment will appear in your activity log shortly.', isRead: true, sentAt: Date.now() - 4000000, from: 'service@paypal.com', to: loggedinUser.email },

        { id: 'e111', subject: 'Google Account Recovery Attempt', body: 'A request to reset your Google Account password was made. If you did not make this request, please review your account activity and change your password.', isRead: false, sentAt: Date.now() - 5000000, from: 'account-recovery@google.com', to: loggedinUser.email },
        { id: 'e112', subject: 'Your Invoice from PayPal', body: 'Your invoice for $29.99 USD is ready. Please review the details and make the necessary payment at your earliest convenience.', isRead: true, sentAt: Date.now() - 6000000, from: 'billing@paypal.com', to: loggedinUser.email },
        { id: 'e113', subject: 'New Login to PayPal Account', body: 'We noticed a new login to your PayPal account from an unknown device. If this was not you, please secure your account immediately.', isRead: false, sentAt: Date.now() - 7000000, from: 'security@paypal.com', to: loggedinUser.email },
        { id: 'e114', subject: 'Payment Confirmation for $89.00', body: 'Your payment to XYZ Electronics for $89.00 USD has been completed. The details of this transaction will be available in your account activity.', isRead: true, sentAt: Date.now() - 8000000, from: 'service@paypal.com', to: loggedinUser.email },
        { id: 'e115', subject: 'Critical Security Update', body: 'Google has identified a potential security issue with your account. We recommend reviewing your recent activity and updating your security settings.', isRead: false, sentAt: Date.now() - 9000000, from: 'security-update@google.com', to: loggedinUser.email },
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
    if (!mail.id) 
        mail.id = Date.now().toString() 
    mails.push(mail) 
    storageService.saveToStorage(MAIL_KEY, mails) 
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

function toggleReadStatus(mailId, isRead = null) {
    return asyncStorageService.get(MAIL_KEY, mailId).then((mail) => {
        mail.isRead = (isRead !== null && isRead !== undefined) ? isRead : !mail.isRead
        asyncStorageService.put(MAIL_KEY, mail) 
        return mail 
    })
}

function toggleStarStatus(mailId) {
    return asyncStorageService.get(MAIL_KEY, mailId).then((mail) => {
        mail.isStarred = !mail.isStarred
        asyncStorageService.put(MAIL_KEY, mail) 
        return mail 
    })
}

function saveDraft(draftMail) {
    if (!draftMail.id) {
        draftMail.id = Date.now().toString() 
    }

    const existingDraftIndex = mails.findIndex(mail => mail.id === draftMail.id)

    if (existingDraftIndex !== -1) {
        mails[existingDraftIndex] = { ...draftMail }
    } else {
        mails.push(draftMail)
    }

    draftMail.sentAt = null 
    draftMail.isDraft = true

    storageService.saveToStorage(MAIL_KEY, mails)

    return asyncStorageService.post(MAIL_KEY, draftMail)
}
