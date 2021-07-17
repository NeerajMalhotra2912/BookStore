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
const helper = require('../../helper/validationSchema');
/**
 *
 * @param {*} app
 * @description creating the routes for api's
 */
module.exports = (app) => {
    app.post('/user', helper.setRole('user'), userControlller.createUser);

    app.post('/admin', helper.setRole('admin'), userControlller.createUser);

    app.post('/userLogin', helper.checkRole('user'), userControlller.login);

    app.post('/adminLogin', helper.checkRole('admin'), userControlller.login);

    app.post('/forgetPassword', userControlller.forgetPassword);

    app.post('/resetPassword', userControlller.resetPassword);
};
