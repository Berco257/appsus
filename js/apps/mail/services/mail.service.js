'use strict';

import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'

export const mailService = {
    query,
    addMail,
    removeMail,
    getMailById,
    moveMailToTrash,
    toggleMailIsRead,
    toggleMailIsStarred,
    restoreMail,
}

let gMails;
const KEY = 'mailDB';
const loggedinUser = {
    email: 'user@appsus.com',
    fullname: 'David Berco Ben Ishai'
}

_createMails();

function query(filterBy) {
    if (filterBy) {
        const mailsToShow = gMails.filter(mail => {
            switch (filterBy) {
                case 'starred':
                    return mail.isStarred && mail.sentAt && !mail.removedAt
                case 'inbox':
                    return mail.to[1] === loggedinUser.email && mail.sentAt && !mail.removedAt
                case 'sent':
                    return mail.from[1] === loggedinUser.email && mail.sentAt && !mail.removedAt
                case 'draft':
                    return !mail.sentAt && !mail.removedAt
                case 'trash':
                    return mail.removedAt
            }
        })
        return Promise.resolve(mailsToShow)
    }
    return Promise.resolve(gMails)
}

function addMail({dir, to, from, sentAt, subject, body, isRead }) {
    var mail = _createMail(dir, to, from, sentAt, subject, body, isRead)
    gMails.unshift(mail)
    _saveMailsToStorage();
    return Promise.resolve()
}

function toggleMailIsRead(mailId) {
    var mailIdx = gMails.findIndex(mail => mailId === mail.id)
    gMails[mailIdx].isRead = !gMails[mailIdx].isRead
    return Promise.resolve()
}

function toggleMailIsStarred(mailId) {
    var mailIdx = gMails.findIndex(mail => mailId === mail.id)
    gMails[mailIdx].isStarred = !gMails[mailIdx].isStarred
    return Promise.resolve()
}

function moveMailToTrash(mailId) {
    var mailIdx = gMails.findIndex(mail => mailId === mail.id)
    gMails[mailIdx].removedAt = Date.now()
    _saveMailsToStorage();
    return Promise.resolve()
}

function restoreMail (mailId){
    var mailIdx = gMails.findIndex(mail => mailId === mail.id)
    gMails[mailIdx].removedAt = 0
    _saveMailsToStorage();
    return Promise.resolve()
}

function removeMail(mailId) {
    var mailIdx = gMails.findIndex(mail => mailId === mail.id)
    gMails.splice(mailIdx, 1)
    _saveMailsToStorage();
    return Promise.resolve()
}


function getMailById(mailId) {
    var mail = gMails.find(mail => mailId === mail.id)
    return Promise.resolve(mail)
}

function _createMails() {
    gMails = storageService.loadFromStorage(KEY)
    if (!gMails || !gMails.length) {
        gMails = [
            _createMail('in', ['David Berco Ben Ishai', 'user@appsus.com'], ['Appsus support', 'support@appsus.com'], 1551133930594, 'Welcome from Appsus!', 'Thank you for signup!', false),
            _createMail('out', ['David ben ishai', 'benishai@gmail.com'], ['David Berco Ben Ishai', 'user@appsus.com'], 1551133930594, 'Keep App', 'Well done for the great work! Everything works just great! Thanks', true),
            _createMail('out', ['Alon', 'alon@coding-academy.com'], ['David Berco Ben Ishai', 'user@appsus.com'], 0, 'Yooooo alon wu?!', 'We just wanted to catch up. How are you? Stay in Touch!', false),
            _createMail('in', ['David Berco Ben Ishai', 'user@appsus.com'], ['Appsus support', 'support@appsus.com'], 1551133930594, 'Customer service', 'Thanks for writing to us. We will get back to you within 48 hours.', true),
            _createMail('out', ['Berco', 'berc.david@gmail.com'], ['David Berco Ben Ishai', 'user@appsus.com'], 1551133930594, 'How are you?', 'I wanted to know if you are getting along with the new app. waiting for update.', false),
        ]
        _saveMailsToStorage();
    }
}

function _createMail(dir, to, from, sentAt, subject, body, isRead) {
    return {
        id: utilService.makeId(),
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