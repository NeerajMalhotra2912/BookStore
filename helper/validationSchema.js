/* eslint-disable indent */
/* eslint-disable spaced-comment */
/*************************************************************************
 * Execution        : 1. default node       cmd> npm start
 *
 * Purpose          : to create the validation schema for user Api using hapi-joi.
 *
 * @file            : validationSchema.js
 * @author          : Neeraj Malhotra
 * @version         : 1.0.0
 *
 **************************************************************************/

require('dotenv').config();
const joi = require('@hapi/joi');
const jwt = require('jsonwebtoken');

/**
 * @description : creating schema for registartion
 */
class Helper {
  registationSchema = joi.object({
    firstName: joi.string().min(3).pattern(/^[A-Z][a-zA-Z]{2}/).required(),
    lastName: joi.string().min(3).pattern(/^[A-Z][a-zA-Z]{2}/).required(),
    email: joi.string().email().required(),
    password: joi.string().pattern(/^[A-Z][a-zA-Z0-9]{5,}[$&^!@#()|,;:<>?/%-+][0-9]{3,}/).required(),
    role: joi.string().required()
  });

  loginSchema = joi.object({
    email: joi.string().required(),
    password: joi.string().required()
  });

  setRole = (role) => {
    return (req, res, next) => {
      req.role = role;
      next();
    }
  }

  createToken = (result) => {
    const token = jwt.sign({ email: result.email, id: result._id, role: result.role }, process.env.JWT, { expiresIn: '1 day' });
    // client.setex('token', 7200, token);
    return token;
  };
}

module.exports = new Helper();
