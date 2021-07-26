/* eslint-disable indent */
/* eslint-disable spaced-comment */
/*************************************************************************
 * Execution        : 1. default node       cmd> npm run test
 *
 * Purpose          : to write test cases for book store api
 *
 *
 * @file            : registration-test.js
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

describe('user registartion', () => {
  it.skip('givenUserDetails_whenProper_ShouldRegisterUser', (done) => {
    chai.request(server).post('/user')
      .send(userData.user.userRegistration)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('givenUserDetails_whenWrong_ShouldNotRegisterUser', (done) => {
    chai.request(server).post('/user')
      .send(userData.user.in_correct_Registration)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

describe('admin registartion', () => {
  it.skip('givenAdminDetails_whenProper_shouldRegisterAdmin', (done) => {
    chai.request(server).post('/admin')
      .send(userData.user.adminRegistration)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('givenAdminDetails_whenWrong_ShouldNotRegisterAdmin', (done) => {
    chai.request(server).post('/admin')
      .send(userData.user.in_correct_Registration)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });
});

describe('user login', () => {
  it('givenUserLoginDetails_whenProper_shouldDoUserLogin', (done) => {
    chai.request(server).post('/userLogin')
      .send(userData.user.userLogin)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('givenUserLoginDetails_whenWrong_shouldNotDoUserLogin', (done) => {
    chai.request(server).post('/userLogin')
      .send(userData.user.userLoginWithImproperDetail)
      .end((err, res) => {
        res.should.have.status(400);
      });
    done();
  });
});

describe('admin login', () => {
  it('givenAdminLoginDetails_whenProper_shouldDoAdminLogin', (done) => {
    chai.request(server).post('/adminLogin')
      .send(userData.user.adminLogin)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('givenAdminLoginDetails_whenWrong_shouldNotDoAdminLogin', (done) => {
    chai.request(server).post('/adminLogin')
      .send(userData.user.adminLoginWithImproperDetails)
      .end((err, res) => {
        res.should.have.status(400);
      });
    done();
  });
});

describe('forget Password', () => {
  it('givenEmail_whenProper_shouldSendResetMail', (done) => {
    chai.request(server).post('/forgetPassword')
      .send(userData.user.forgetPasswordData)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  it('givenEmail_whenWrong_shouldNotSendResetMail', (done) => {
    chai.request(server).post('/forgetPassword')
      .send(userData.user.forgetPasswordWithImproperDetails)
      .end((err, res) => {
        res.should.have.status(400);
      });
    done();
  });
});

describe('reset Password', () => {
  it('givenToken_whenWrong_shouldNotResetPassword', (done) => {
    chai.request(server).post('/resetPassword')
      .set('token', `${userData.user.credentials.wrongToken}`)
      .send(userData.user.resetPassword)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });

  it.skip('givenToken_whenProper_shouldResetPassword', (done) => {
    chai.request(server).post('/resetPassword')
      .set('token', `${userData.user.credentials.token}`)
      .send(userData.user.resetPassword)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
