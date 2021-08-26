'use strict'

export const mailUtilService = {
    isWrongFolder,
}

function isWrongFolder(pathName) {
    if (!(pathName === 'inbox' || pathName === 'sent' ||
        pathName === 'draft' || pathName === 'trash' || pathName === 'starred')) {

        return true
    }
    return false
}