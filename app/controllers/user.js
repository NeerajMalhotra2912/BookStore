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
const jwt = require('jsonwebtoken');

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
            const validationResult = helper.registationSchema.validate(userData);
            if (validationResult.error) {
                res.status(400).send({
                    success: false,
                    message: 'Please follow the rules for registration',
                    // data: validationResult,
                });
                return;
            }
            userService.createUser(userData, (error, data) => {
                if (error) {
                    return res.status(400).send({
                        success: false,
                        message: "Registration failed",
                        error
                    });
                }
                return res.status(200).send({
                    success: true,
                    message: 'Registered successfully',
                    // data
                });
            });
        } catch (err) {
            res.status(500).send({
                success: false,
                message: 'Internal error from the server',
            });
        }
    }
    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @description : created login api for user and admin login.
     */
    login = (req, res) => {
        try {
            const loginData = {
                email: req.body.email,
                password: req.body.password,
            };
            const validateRequest = helper.loginSchema.validate(loginData);
            if (validateRequest.error) {
                res.status(400).send({
                    success: false,
                    error: 'Please follow the rules for login',
                    data: validateRequest,
                });
                return;
            }
            userService.login(loginData, (error, result) => {
                if (error) {
                    return res.status(400).send({
                        success: false,
                        message: 'Login failed',
                        error,
                    });
                }
                return res.status(200).send({
                    success: true,
                    message: 'Logged in Successfully',
                    token: helper.createToken(result),
                });
            });
        } catch (err) {
            return res.status(500).send({
                success: false,
                message: 'Internal error from the server',
            });
        }
    }
    forgetPassword = (req, res) => {
        try {
            const userData = {
                email: req.body.email,
            };
            userService.forgetPassword(userData, (error, result) => {
                if (error) {
                    return res.status(400).send({
                        success: false,
                        message: 'Unable to send mail',
                        error,
                    });
                }
                return res.status(200).send({
                    success: true,
                    message: 'Email sent successfully',
                    result,
                });
            });
        } catch (err) {
            return res.status(500).send({
                success: false,
                message: 'Internal error from the server',
            });
        }
    }

    resetPassword = (req, res) => {
        try {
            const verifyRole = jwt.verify(req.headers.token, process.env.JWT);
            const resetPass = {
                password: req.body.password,
                email: verifyRole.name,
            }
            userService.resetPassword(resetPass, (err, result) => {
                if (err) {
                    return res.status(401).send({
                        success: false,
                        message: 'Un-authorized access to reset your password',
                        err,
                    });
                } else {
                    return res.status(200).send({
                        success: true,
                        message: 'Password reset is Successful',
                        // result,
                    });
                }
            });
        } catch (error) {
            return res.status(400).send({
                success: false,
                message: 'Time-out, please try again to reset your password',
                error
            });
        }

    }
};

module.exports = new UserRegistration();