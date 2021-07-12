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

const { registationSchema } = require('../../helper/validationSchema.js');
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
            const userDetails = {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password
            };
            if (!req.body.firstName || !req.body.lastName || !req.body.email || !req.body.password) {
                return res.status(400).send({
                    message: "Fields can't be empty, please fill all details."
                })
            }
            const checkValidation = registationSchema.validate(userDetails);
            if (checkValidation.error) {
                res.send({ message: "Please enter correct details for ragistration." });
                return;
            }
            user.createUser(userDetails, (error, result) => {
                if (error) {
                    res.status(400).send({
                        success: false,
                        message: "Email already exist.",
                        error
                    });
                }
                else {
                    res.status(200).send({
                        success: true,
                        message: "User Ragistered Successfully",
                        // data : result
                    });
                }
            });
        } catch (error) {
            res.status(500).send({
                success: false,
                message: "Internal error from server"
            })
        }
    }
};
module.exports = new UserRegistration();