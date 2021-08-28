'use strict'
import { mailService } from './mail.service.js'

export const mailUtilService = {
    isWrongFolder,
    onAddEditMail,
    onRemoveMail,
    onMoveMailToTrash,
}

function isWrongFolder(pathName) {
    if (!(pathName === 'inbox' || pathName === 'sent' ||  pathName === 'draft' ||
    pathName === 'trash' || pathName === 'starred' || pathName === 'search')) {

        return true
    }
    return false
}

function onAddEditMail({ toEmail, subject, body }, sentAt, mailId, func) {
    let fullname = toEmail.split("@")[0]
    fullname = fullname.charAt(0).toUpperCase() + fullname.substring(1, fullname.length)
    const mail = {
        dir: 'out', to: { fullname, email: toEmail }, from: mailService.getLoggedInUser(),
        sentAt, subject, body, isRead: false
    }

    mailService.addEditMail(mail, mailId).then(() => {
        // eventBusService.emit('user-msg', { txt: 'Mail deleted!', type: 'danger' })
        func()
    })
}

function onRemoveMail(mailId, func) {
    mailService.removeMail(mailId).then(() => {
        // eventBusService.emit('user-msg', { txt: 'Mail deleted!', type: 'danger' })
        func()
    })
}


function onMoveMailToTrash (mailId, func) {
    mailService.moveMailToTrash(mailId).then(() => {
        func()
    })
}