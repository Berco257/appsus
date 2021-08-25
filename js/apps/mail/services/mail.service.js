import { storageService } from '../../../services/storage.service.js'
import { utilService } from '../../../services/util.service.js'

export const bookService = {
    query,
    createMail,

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

// function getBookById(bookId) {
//     var book = gBooks.find(book => bookId === book.id)
//     return Promise.resolve(book)
// }

// function addGoogleBook(book) {
//     gBooks.unshift(book)
//     _saveBooksToStorage()
//     return Promise.resolve()
// }

// function addReview(bookId, review) {
//     var bookIdx = gBooks.findIndex(book => {
//         return book.id === bookId
//     })

//     if (gBooks[bookIdx].reviews === undefined) gBooks[bookIdx].reviews = []
//     gBooks[bookIdx].reviews.unshift(review)
//     gBooks[bookIdx].reviews[0].id = utilService.makeId()
//     _saveBooksToStorage();
//     return Promise.resolve()
// }

// function removeReview(bookId, reviewId) {
//     const bookIdx = gBooks.findIndex(book => bookId === book.id)
//     const reviewIdx = gBooks[bookIdx].reviews.findIndex(review => reviewId === review.id)

//     gBooks[bookIdx].reviews.splice(reviewIdx, 1)
//     _saveBooksToStorage();
//     return Promise.resolve()
// }


function _saveMailsToStorage() {
    storageService.saveToStorage(KEY, gBooks)
}

function _createMails() {
    gMails = storageService.loadFromStorage(KEY)
    if (!gMails || !gMails.length) {
        gMails = [
            createMail('user@appsus.com', 'support@appsus.com', 1551133930594, 'Welcome from Appsus!', 'Thank you for signup!', false),
            createMail('benishai@gmail.com', 'user@appsus.com', 1551133930594, 'Keep App', 'Well done for the great work! Everything works just great! Thanks', true),
            createMail('alon@coding-academy.com', 'user@appsus.com', 1551133930594, 'Yooooo alon wu?!', 'We just wanted to catch up. How are you? Stay in Touch!', false),
            createMail('user@appsus.com', 'support@appsus.com', 1551133930594, 'Customer service', 'Thanks for writing to us. We will get back to you within 48 hours.', true),
            createMail('berc.david@gmail.com', 'user@appsus.com', 1551133930594, 'How are you?', 'I wanted to know if you are getting along with the new app. waiting for update.', false),
        ]
        _saveMailsToStorage();
    }
}

function createMail(to, from, sentAt, subject, body, isRead) {
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
