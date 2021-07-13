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

  setRole = (role) => {
    return (req, res, next) => {
      req.role = role;
      console.log("role validation : ", role);
      next();
    }
  }
}

module.exports = new Helper();
