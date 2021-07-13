/*************************************************************************
 * Execution        : 1. default node       cmd> npm start
 * 
 * Purpose          : to create the models for user ragistration.
 *                    
 * 
 * @file            : user.js
 * @author          : Neeraj Malhotra
 * @version         : 1.0.0
 * 
 **************************************************************************/
const mongoose = require('mongoose');
/**
 * 
 * @description Creating the user schema for user. 
 */
const userSchema = mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: false
    }
},
    {
        versionKey: false
    },
    {
        timestamps: true
    }
);

const userModel = mongoose.model('User', userSchema);

class UserRegistrationModel {
    /**
     * 
     * @param {*} userData 
     * @param {*} callback 
     * @description : createUser will take the request from services and create the user according to schema
     */
    createUser = (userData, callback) => {
        const user = new userModel({
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            password: userData.password,
            role: userData.role
        });
        user.save(callback);
    };

}

module.exports = new UserRegistrationModel();