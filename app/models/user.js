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
const bcrypt = require('bcrypt');
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
userSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.password, salt)
        this.password = hashedPassword
        next()
    } catch (error) {
        next(error)
    }

});
const userModel = mongoose.model('User', userSchema);

class UserRegistrationModel {
    /**
     * 
     * @param {*} userData 
     * @param {*} callback 
     * @description : createUser will take the request from services and create the user according to schema
     */

    createUser = async (userData, callback) => {
        const user = new userModel({
            firstName: userData.firstName,
            lastName: userData.lastName,
            email: userData.email,
            password: userData.password,
            role: userData.role
        });
        const check = await userModel.findOne({ email: userData.email });
        if (check) {
            callback('Please check your email for duplicasy');
        } else {
            const registrationData = await user.save();
            callback(null, registrationData);
        }
    }

    login = (data, callback) => {
        userModel.findOne({ email: data.email })
            .then((user) => {
                callback(null, user);
            });
    }

    forgetPassword = (data, callback) => {
        userModel.findOne({ email: data.email })
            .then((dataOne) => {
                callback(null, dataOne);
            });
    }

    resetPassword = async (data, callback) => {
        const salt = await bcrypt.genSalt(10);
        const encrypt = await bcrypt.hash(data.password, salt);
        userModel.findOneAndUpdate({ email: data.email }, { password: encrypt }, callback(null, data));
    }

}

module.exports = new UserRegistrationModel();