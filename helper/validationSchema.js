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
const ejs = require('ejs');
const nodemailer = require('nodemailer');
const redis = require('redis');
const { cli } = require('winston/lib/winston/config');
const client = redis.createClient();
const logger = require('../logger/logger');
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

  bookValidationSchema = joi.object({
    author: joi.string().required(),
    title: joi.string().required(),
    image: joi.string().required(),
    quantity: joi.number().required(),
    price: joi.number().required(),
    description: joi.string().required()
  });

  updatedBookSchema = joi.object({
    author: joi.string().required(),
    title: joi.string().required(),
    image: joi.string().required(),
    quantity: joi.number().required(),
    price: joi.number().required(),
    description: joi.string().required(),
    bookId: joi.string().required(),
  });

  setRole = (role) => {
    return (req, res, next) => {
      req.role = role;
      next();
    }
  }

  checkRole = (role) => (req, res, next) => {
    req.role = role;
    if (role.includes(req.role)) {
      next();
    } else {
      return res.status(401).send({
        success: false,
        message: 'In-Correct role'
      });
    }
  };

  createToken = (result) => {
    const token = jwt.sign({ email: result.email, id: result._id, role: result.role }, process.env.JWT, { expiresIn: '1 day' });
    client.setex('token', 7200, token);
    return token;
  };

  verifyRole = (req, res, next) => {
    try {
      const tokenVerification = jwt.verify(req.headers.token, process.env.JWT);
      client.get('role', (err, result) => {
        if (err) throw err;
        if (tokenVerification.role === 'admin' && result === 'admin') {
          req.userData = tokenVerification;
          const userId = tokenVerification.id;
          req.userId = userId;
        }
        else {
          res.status(401).send({
            err: 'Authentication failed',
          });
        }
        next();
      });
    } catch (err) {
      res.status(401).send({
        err: 'Unauthorized user',
      });
    }
  };

  /**
  *
  * @param {*} req
  * @param {*} res
  * @param {*} next
  * @description : verifyToken will validate the token generated
  */
  verifyToken = (req, res, next) => {
    try {
      const decode = jwt.verify(req.headers.token, process.env.JWT);
      client.get('token', (err, token) => {
        if (err) throw err;
        if (req.headers.token === token) {
          req.userData = decode;
          const userId = decode.id;
          req.userId = userId;
        }
        next();
      });
    } catch (error) {
      res.status(401).send({
        error: 'Your token has expiered',
      });
    }
  };

  mail = (data) => {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    ejs.renderFile('app/mail/mail.ejs', (error, info) => {
      if (error) {
        console.log('error', error);
      } else {
        const mailOption = {
          from: process.env.USER,
          to: process.env.USER,
          subject: 'Reset password',
          html: `${info}<button><a href="${process.env.baseUrl}${`forgetPassword/`}${this.createToken(data)}">Reset Password</a>
          </button>`,
        };
        transporter.sendMail(mailOption, function (error, info) {
          (error) ? console.log("this is the error from mailer " + error) : console.log('Password Reset mail sent successfully, please check your mail.' + info.response);
        });
      }
    });
  };
}

module.exports = new Helper();
