'use strict';

import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'

export const mailService = {
    query,
    addEditMail,
    removeMail,
    getMailById,
    moveMailToTrash,
    toggleMailIsRead,
    toggleMailIsStarred,
    restoreMail,
    getLoggedInUser,
    getUnreadMailsCount,
}

let gMails;
const KEY = 'mailDB';
const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'David Berco Ben Ishai'
}

_createMails();

function query(filterBy) {
    let mailsToShow = getMailsByFolder(gMails, filterBy.folder)
    mailsToShow = getMailsByPhrase(mailsToShow, filterBy.phrase)
    mailsToShow = getMailByIsRead(mailsToShow, filterBy.isRead)

    return Promise.resolve(mailsToShow)
}

function getMailByIsRead(mails, isRead) {
    if (isRead === 'false') isRead = false
    else if (isRead === 'true') isRead = true
    return mails.filter(mail => {
        if (isRead === 'all') return true
        return mail.isRead === isRead
    })
}

function getMailsByPhrase(mails, phrase) {
    phrase = phrase.toLowerCase()
    return mails.filter(mail => {
        return (
            mail.to.fullname.toLowerCase().includes(phrase) ||
            mail.to.email.toLowerCase().includes(phrase) ||
            mail.from.fullname.toLowerCase().includes(phrase) ||
            mail.from.email.toLowerCase().includes(phrase) ||
            mail.subject.toLowerCase().includes(phrase) ||
            mail.body.toLowerCase().includes(phrase)
        )
    })
}

function getMailsByFolder(mails, folder) {
    return mails.filter(mail => {
        switch (folder) {
            case 'starred':
                return mail.isStarred && mail.sentAt && !mail.removedAt
            case 'inbox':
                return mail.to.email === loggedinUser.email && mail.sentAt && !mail.removedAt
            case 'sent':
                return mail.from.email === loggedinUser.email && mail.sentAt && !mail.removedAt
            case 'draft':
                return !mail.sentAt && !mail.removedAt
            case 'trash':
                return mail.removedAt
            case 'search':
                return true
        }
    })
}

function getUnreadMailsCount(folder) {
    return getMailsByFolder(gMails, folder).filter(mail => !mail.isRead).length
}

function addEditMail({ dir, to, from, sentAt, subject, body, isRead }, mailId) {
    const mailIdx = gMails.findIndex(mail => mailId === mail.id)
    let mail;
    if (mailIdx === -1) {
        mail = _createMail(mailId, dir, to, from, sentAt, subject, body, isRead)
        gMails.unshift(mail)
    } else {
        mail = { ...gMails[mailIdx], to, sentAt, subject, body }
        gMails[mailIdx] = mail
    }

    _saveMailsToStorage();
    return Promise.resolve()
}

function toggleMailIsRead(mailId) {
    const mailIdx = gMails.findIndex(mail => mailId === mail.id)
    gMails[mailIdx].isRead = !gMails[mailIdx].isRead
    _saveMailsToStorage();
    return Promise.resolve()
}

function toggleMailIsStarred(mailId) {
    const mailIdx = gMails.findIndex(mail => mailId === mail.id)
    gMails[mailIdx].isStarred = !gMails[mailIdx].isStarred
    _saveMailsToStorage();
    return Promise.resolve()
}

function moveMailToTrash(mailId) {
    const mailIdx = gMails.findIndex(mail => mailId === mail.id)
    gMails[mailIdx].removedAt = Date.now()
    _saveMailsToStorage();
    return Promise.resolve()
}

function restoreMail(mailId) {
    const mailIdx = gMails.findIndex(mail => mailId === mail.id)
    gMails[mailIdx].removedAt = 0
    _saveMailsToStorage();
    return Promise.resolve()
}

function removeMail(mailId) {
    const mailIdx = gMails.findIndex(mail => mailId === mail.id)
    gMails.splice(mailIdx, 1)
    _saveMailsToStorage();
    return Promise.resolve()
}

function getMailById(mailId) {
    const mail = gMails.find(mail => mailId === mail.id)
    return Promise.resolve(mail)
}

function getLoggedInUser() {
    return loggedinUser
}

function _createMails() {
    gMails = storageService.loadFromStorage(KEY)
    if (!gMails || !gMails.length) {
        gMails = [
            _createMail(null, 'in', { fullname: 'David Berco Ben Ishai', email: 'user@appsus.com' }, { fullname: 'Appsus support', email: 'support@appsus.com' }, 1551133930594, 'Welcome from Appsus!', 'Thank you for signup!', false),
            _createMail(null, 'out', { fullname: 'David ben ishai', email: 'benishai@gmail.com' }, { fullname: 'David Berco Ben Ishai', email: 'user@appsus.com' }, 1551133930594, 'Keep App', 'Well done for the great work! Everything works just great! Thanks', true),
            _createMail(null, 'out', { fullname: 'Alon', email: 'alon@coding-academy.com' }, { fullname: 'David Berco Ben Ishai', email: 'user@appsus.com' }, 0, 'Yooooo alon wu?!', 'We just wanted to catch up. How are you? Stay in Touch!', false),
            _createMail(null, 'in', { fullname: 'David Berco Ben Ishai', email: 'user@appsus.com' }, { fullname: 'Appsus support', email: 'support@appsus.com' }, 1551133930594, 'Customer service', 'Thanks for writing to us. We will get back to you within 48 hours.', true),
            _createMail(null, 'out', { fullname: 'Berco', email: 'berc.david@gmail.com' }, { fullname: 'David Berco Ben Ishai', email: 'user@appsus.com' }, 1551133930594, 'How are you?', 'I wanted to know if you are getting along with the new app. waiting for update.', false),
        ]
        _saveMailsToStorage();
    }
}

function _createMail(id, dir, to, from, sentAt, subject, body, isRead) {
    return {
        id: id === null ? utilService.makeId() : id,
        dir,
        to,
        from,
        sentAt,
        subject,
        body,
        isRead,
        removedAt: 0,
        isStarred: false,
    }
}

function _saveMailsToStorage() {
    storageService.saveToStorage(KEY, gMails)
}