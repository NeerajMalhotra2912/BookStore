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
}

module.exports = new BookModel();