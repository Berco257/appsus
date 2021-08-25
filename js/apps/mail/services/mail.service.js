import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'

export const mailService = {
    query,
    addMail,
    removeMail,
}

const KEY = 'mailDB';
let gMails;
const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'David Berco Ben Ishai'
}

_createMails();

function query(filterBy) {
    // if (filterBy) {
    //     let { unread, minPrice, maxPrice } = filterBy
    //     minPrice = minPrice ? minPrice : 0
    //     maxPrice = maxPrice ? maxPrice : Infinity
    //     const mailsToShow = gBooks.filter(book => {
    //         return book.title.includes(title) && book.listPrice.amount >= minPrice && book.listPrice.amount <= maxPrice
    //     })
    //     return Promise.resolve(mailsToShow)
    // }
    return Promise.resolve(gMails)
}

function addMail({ to, from, sentAt, subject, body, isRead }) {
    var mail = _createMail(to, from, sentAt, subject, body, isRead)
    gMails.unshift(mail)
    _saveMailsToStorage();
    return Promise.resolve()
}

function removeMail(mailId) {
    var mailIdx = gMails.findIndex(mail => mailId === mail.id)
    gMails.splice(mailIdx, 1)
    _saveMailsToStorage();
    return Promise.resolve()
}

function _createMails() {
    gMails = storageService.loadFromStorage(KEY)
    if (!gMails || !gMails.length) {
        gMails = [
            _createMail('user@appsus.com', 'support@appsus.com', 1551133930594, 'Welcome from Appsus!', 'Thank you for signup!', false),
            _createMail('benishai@gmail.com', 'user@appsus.com', 1551133930594, 'Keep App', 'Well done for the great work! Everything works just great! Thanks', true),
            _createMail('alon@coding-academy.com', 'user@appsus.com', 1551133930594, 'Yooooo alon wu?!', 'We just wanted to catch up. How are you? Stay in Touch!', false),
            _createMail('user@appsus.com', 'support@appsus.com', 1551133930594, 'Customer service', 'Thanks for writing to us. We will get back to you within 48 hours.', true),
            _createMail('berc.david@gmail.com', 'user@appsus.com', 1551133930594, 'How are you?', 'I wanted to know if you are getting along with the new app. waiting for update.', false),
        ]
        _saveMailsToStorage();
    }
}

function _createMail(to, from, sentAt, subject, body, isRead) {
    return {
        id: utilService.makeId(),
        to,
        from,
        sentAt,
        subject,
        body,
        isRead,
    }
}

function _saveMailsToStorage() {
    storageService.saveToStorage(KEY, gMails)
}