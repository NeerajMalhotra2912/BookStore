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

const userService = require('../services/user.js');
const helper = require('../../helper/validationSchema');

class UserRegistration {
    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @description : creating user registration api controller which will send data to services.
     */
    createUser = (req, res) => {
        try {
            const userData = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password,
                role: req.role
            };
            // console.log("Data : ", userData);
            const validationResult = helper.registationSchema.validate(userData);
            console.log("validate : ", validationResult);
            if (validationResult.error) {
                res.status(400).send({
                    success: false,
                    message: 'Pass the proper format of all the fields',
                    data: validationResult,
                });
                return;
            }
            userService.createUser(userData, (error, data) => {
                if (error) {
                    return res.status(400).send({
                        success: false,
                        message: error,
                    });
                }
                return res.status(200).send({
                    success: true,
                    message: 'Registered successfully',
                });
            });
        } catch (err) {
            res.status(500).send({
                success: false,
                message: 'Internal error from the server',
            });
        }
    }
};

module.exports = new UserRegistration();