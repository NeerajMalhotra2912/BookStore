/* eslint-disable indent */
/* eslint-disable spaced-comment */
/*************************************************************************
 * Execution        : 1. default node       cmd> npm run test
 *
 * Purpose          : to write test cases for register,login,forget and reset password.
 *
 *
 * @file            : registration.js
 * @author          : Neeraj Malhotra
 * @version         : 1.0.0
 *
 **************************************************************************/

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.use(chaiHttp);
const userData = require('./user.json');

chai.should();

describe('registrartion', () => {
  it('givenUserDetails_whenProper_ShouldRegisterUser', (done) => {
    const userInfo = userData.user.correct_Data_For_Ragistration;
    chai.request(server).post('/userRagistrartion').send(userInfo).end((err, res) => {
      res.should.have.status(404);
      done();
    });
  });

  it('givenUserDetails_whenWrong_ShouldNotRegisterUser', (done) => {
    const userInfo = userData.user.in_correct_Data_For_Ragistration;
    chai.request(server).post('/inCorrectUser').send(userInfo).end((err, res) => {
      res.should.have.status(404);
      done();
    });
  });
});
