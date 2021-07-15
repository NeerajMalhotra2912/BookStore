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

const userRegistrationModel = require('../models/user.js');
const bcrypt = require('bcrypt');
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
}

module.exports = new UserData();