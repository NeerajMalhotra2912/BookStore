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
const mongoose = require('mongoose');

/**
 * @description : creating bookschema for books crud operations
 */
const bookSchema = mongoose.Schema({
    author: {
        type: String,
    },
    title: {
        type: String,
    },
    image: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
},
    {
        versionKey: false,
    },
    {
        timestamps: true,
    },
);

const bookModel = mongoose.model('Book', bookSchema);

class BookModel {
    /**
     * 
     * @param {*} data 
     * @description : addBook will take data from services to save details in db. 
     */
    addBook = (data) => {
        const note = new bookModel({
            author: data.author,
            title: data.title,
            image: data.image,
            quantity: data.quantity,
            price: data.price,
            description: data.description,
        });
        return new Promise((resolve, reject) => {
            note.save()
                .then((book) => resolve(book))
                .catch((err) => reject(err));
        });
    }
    /**
     * 
     * @param {*} data 
     * @description : updatedBook will take data from services and updated it in db. 
     */
    updateBook = (data) => {
        return new Promise((resolve, reject) => {
            bookModel.findByIdAndUpdate(data.bookId, {
                author: data.author,
                title: data.title,
                image: data.image,
                quantity: data.quantity,
                price: data.price,
                description: data.description,
            })
                .then((book) => resolve(book))
                .catch((err) => reject(err));
        });
    }
    /**
     * 
     * @description : getallBooks is used to retrieve all books data from Db. 
     */
    getAllBooks = () => {
        return new Promise((resolve, reject) => {
            bookModel.find()
                .then((book) => resolve(book))
                .catch((err) => reject(err));
        });
    }
    /**
     * 
     * @param {*} data 
     * @description : deleteBook will delete the book using its id from Db. 
     */
    deleteBook = (data) => {
        return new Promise((resolve, reject) => {
            bookModel.findByIdAndRemove(data)
                .then((book) => resolve(book))
                .catch((err) => reject(err));
        })
    }
}

module.exports = new BookModel();
