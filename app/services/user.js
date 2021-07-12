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
/**
 * 
 * @description Creating service file for all api of register, login, forget password and reset password
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
}

module.exports = new UserData();