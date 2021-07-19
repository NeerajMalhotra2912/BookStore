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

const bookService = require('../services/book.js');
const helper = require('../../helper/validationSchema');
const jwt = require('jsonwebtoken');

class BookController {

    addBook = (req, res) => {
        try {
            const bookDetails = {
                author: req.body.author,
                title: req.body.title,
                image: req.body.image,
                quantity: req.body.quantity,
                price: req.body.price,
                description: req.body.description,
            };
            console.log("books are : ", bookDetails);
            const validateResult = helper.bookValidationSchema.validate(bookDetails);
            if (validateResult.error) {
                res.status(400).send({
                    success: false,
                    message: 'Please follow the rules for adding book',
                    data: validateResult,
                });
                return;
            }
            const result = bookService.addBook(bookDetails);
            result.then((data) => {
                return res.status(200).send({
                    success: true,
                    message: 'Book added successfully',
                    data,
                });
            }).catch((error) => {
                return res.status(400).send({
                    success: false,
                    message: 'Failed to add book',
                    error,
                });
            })
        } catch (err) {
            res.status(500).send({
                success: false,
                message: 'Internal error from the server',
                err,
            });
        }
    }
}

module.exports = new BookController();