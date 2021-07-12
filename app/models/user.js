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
 * @method  userSchema method  
 * @description Creating the user schema for user details. 
 * @returns save the encrypted password and other details.
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
}, {
    versionKey: false
},
    {
        timestamps: true
    });
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
    createUser = (userData, callback) => {
        const user = new userModel(userData);
        user.save((err, userResult) => {
            (err) ? callback(err, null) : callback(null, userResult);
        });
    };
}

module.exports = new UserRegistrationModel;