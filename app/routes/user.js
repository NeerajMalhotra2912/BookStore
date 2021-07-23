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
const userControlller = require('../controllers/user');
const booksController = require('../controllers/book');
const cartController = require('../controllers/cart');
const helper = require('../../helper/validationSchema');
const redis = require('../../helper/redis');
/**
 *
 * @param {*} app
 * @description creating the routes for Book store api's
 */
module.exports = (app) => {
    app.post('/user', helper.setRole('user'), userControlller.createUser);

    app.post('/admin', helper.setRole('admin'), userControlller.createUser);

    app.post('/userLogin', helper.checkRole('user'), userControlller.login);

    app.post('/adminLogin', helper.checkRole('admin'), userControlller.login);

    app.post('/forgetPassword', userControlller.forgetPassword);

    app.post('/resetPassword', helper.verifyToken, userControlller.resetPassword);

    app.post('/book', helper.verifyRole, booksController.addBook);

    app.put('/book/:bookId', helper.verifyRole, booksController.updateBook);

    app.get('/book', helper.verifyToken, redis.redisMiddleWare, booksController.getAllBooks);

    app.delete('/book/:bookId', helper.verifyRole, booksController.deleteBook);

    app.post('/addToCart', helper.verifyToken, cartController.addToCart);
};
