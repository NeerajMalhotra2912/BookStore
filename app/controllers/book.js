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

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @description : created controller to addBook into database
     */
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

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @description : updateBook api will be used to update the books details 
     */
    updateBook = (req, res) => {
        try {
            const bookDetails = {
                author: req.body.author,
                title: req.body.title,
                image: req.body.image,
                quantity: req.body.quantity,
                price: req.body.price,
                description: req.body.description,
                bookId: req.params.bookId,
            };
            const validateResult = helper.updatedBookSchema.validate(bookDetails);
            if (validateResult.error) {
                res.status(400).send({
                    success: false,
                    message: 'Please fill all the fields as per rules',
                    data: validateResult,
                });
                return;
            }
            const result = bookService.updateBook(bookDetails);
            result.then(() => {
                return res.status(200).send({
                    success: true,
                    message: 'Your book updated successfully',
                });
            }).catch(() => {
                return res.status(400).send({
                    success: false,
                    message: 'Failed to update book',
                });
            })
        } catch (err) {
            res.status(500).send({
                success: false,
                message: 'Internal error from the server',
            });
        }
    }

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * description : created getall Books to retrieve all the books stored in database.
     */
    getAllBooks = (req, res) => {
        try {
            const result = bookService.getAllBooks()
            result.then((book) => {
                return res.status(200).send({
                    success: true,
                    message: 'Books retrieved successfully',
                    book,
                });
            }).catch((error) => {
                return res.status(400).send({
                    success: false,
                    message: 'Failed to retrieve the books',
                });
            })
        } catch (err) {
            res.status(500).send({
                success: false,
                message: 'Internal error from the server',
            });
        }
    }

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @description : created deleteBook api to delete any book from books database.
     */
    deleteBook = (req, res) => {
        try {
            const result = bookService.deleteBook(req.params.bookId)
            result.then(() => {
                return res.status(200).send({
                    success: true,
                    message: 'Your Book deleted Successfully',
                });
            }).catch(() => {
                return res.status(400).send({
                    success: false,
                    message: 'Failed to delete book',
                });
            })
        } catch (err) {
            res.status(500).send({
                success: false,
                message: 'Internal error from the server',
            });
        }
    }
}

module.exports = new BookController();