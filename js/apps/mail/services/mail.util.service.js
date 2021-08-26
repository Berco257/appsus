'use strict'

export const mailUtilService = {
    redirectWrongFolder,
}

function redirectWrongFolder(pathName) {
    if (!(pathName === 'inbox' || pathName === 'sent' ||
        pathName === 'draft' || pathName === 'trash')) {

        return true
    }
    return false
}