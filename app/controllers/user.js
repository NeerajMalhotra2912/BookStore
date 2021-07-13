/*************************************************************************
 * Execution        : 1. default node       cmd> npm start
 * 
 * Purpose          : to create the controller for user registration 
 *                    
 * 
 * @file            : user.js
 * @author          : Neeraj Malhotra
 * @version         : 1.0.0
 * 
**************************************************************************/

const helper = require('../../helper/validationSchema.js');
const user = require('../services/user.js');

class UserRegistration {
    /**
     * 
     * @method createUser method for registration  
     * @description Creating the user for registration and saving its details 
     * @returns registeration status.
     */
    createUser = (req, res) => {
        try {
            const userData = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password,
                // role: req.body.role
            };
            const validationResult = helper.registationSchema.validate(userData);
            if (validationResult.error) {
                res.status(400).send({
                    success: false,
                    message: 'Pass the proper format of all the fields',
                    data: validationResult,
                });
                return;
            }
            user.createUser(userData, (error, data) => {
                if (error) {
                    return res.status(400).send({
                        success: false,
                        message: error,
                    });
                }
                return res.status(200).send({
                    success: true,
                    message: 'registered successfully',
                });
            });
        } catch (err) {
            res.status(500).send({
                success: false,
                message: 'Internal server error',
            });
        }
    }
};
module.exports = new UserRegistration();