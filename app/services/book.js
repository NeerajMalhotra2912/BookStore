/* eslint-disable indent */
// eslint-disable-next-line spaced-comment
/*************************************************************************
 * Execution        : 1. default node       cmd> npm start
 *
 * Purpose          : to hit Api of Ragistartion,Login,Forget Password, and Reset password for user.
 *                  : to hit the Api of notes of Create, updatem retrieve and delete notes.
 *
 * @file            : routes.js
 * @author          : Neeraj Malhotra
 * @version         : 1.0.0
 *
 **************************************************************************/

const bookModels = require('../models/book');
const redis = require('../../helper/redis');

class BookService {
    /**
     * @param {data}  : it contains data which we are passing from body
     * @description   : It is used to adding a book taking data from controller and sending to models
    */
    addBook = (data) => {
        return new Promise((resolve, reject) => {
            const result = bookModels.addBook(data);
            result.then((book) => {
                resolve(book);
            }
            ).catch((err) => reject(err));
        });
    }

    updateBook = (data) => {
        return new Promise((resolve, reject) => {
            const result = bookModels.updateBook(data);
            result.then((book) => resolve(book)
            ).catch((err) => reject(err));
        });
    }

    getAllBooks = () => {
        const KEY = 'book';
        return new Promise((resolve, reject) => {
            const result = bookModels.getAllBooks();
            result.then((booksData) => {
                redis.redisFunction(KEY, booksData);
                resolve(booksData)
            }
            ).catch((err) => reject(err));
        });
    }
}

module.exports = new BookService();
