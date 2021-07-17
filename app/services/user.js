/*************************************************************************
 * Execution        : 1. default node       cmd> npm start
 * 
 * Purpose          : to create the services for user.
 *                    
 * 
 * @file            : user.js
 * @author          : Neeraj Malhotra
 * @version         : 1.0.0
 * 
 **************************************************************************/

const bcrypt = require('bcrypt');
const userRegistrationModel = require('../models/user.js');
const helper = require('../../helper/validationSchema.js');
/**
 * 
 * @description Creating service file for user registration and it will send details to models.
 */
class UserData {
    /**
     * 
     * @param {*} userData 
     * @param {*} callback 
     * @description : createUser will take the request from controller and pass it to models
     */
    createUser = (userData, callback) => {
        userRegistrationModel.createUser(userData, callback);
    }
    /**
     * 
     * @param {*} data 
     * @param {*} callback 
     * @description : creating services for login api this will take request from controller and pass it to models.
     */
    login = (data, callback) => {
        const { password } = data;
        userRegistrationModel.login(data, (error, result) => {
            if (result) {
                bcrypt.compare(password, result.password, (err, resultt) => {
                    if (err) {
                        callback(err, null);
                    }
                    if (resultt) {
                        callback(null, result);
                    } else {
                        callback('Please check your password');
                    }
                });
            } else {
                callback('Please check user details');
            }
        });
    }

    forgetPassword = (data, callback) => {
        userRegistrationModel.forgetPassword(data, (error, result) => {
            console.log("result from services ", result);
            if (result) {
                const details = {
                    email: result.email,
                    _id: result._id,
                    role: result.role
                };
                error ? callback(error, null) : callback(null, helper.mail(details));
            } else {
                callback('Please check your email id again');
            }
        });
    }

    resetPassword = (data, callback) => {
        userRegistrationModel.resetPassword(data, callback);
    }
}

module.exports = new UserData();