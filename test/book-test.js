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
const bookData = require('./book.json');
const loginData = require('./user.json');

chai.should();

let token = '';

describe('Books CRUD Api', () => {
    before((done) => {
        chai.request(server).post('/adminLogin')
            .send(loginData.user.adminLogin)
            .end((err, res) => {
                token = res.body.token;
                done();
            });
    });
    describe('add book', () => {
        it('givenBookDetails_whenProper_shouldAddBook', (done) => {
            chai.request(server).post('/book')
                .set('token', token).send(bookData.books.addBookWithCorrectDetails)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

        it('givenBookDetails_whenWrong_shouldNotAddBook', (done) => {
            chai.request(server).post('/book')
                .set('token', token).send(bookData.books.addBookWithInCorrectDetails)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it('addBook_whenTokenMissing_shouldNotSaveInDB', (done) => {
            chai.request(server).post('/book')
                .send(bookData.books.addBookWithCorrectDetails)
                .end((err, res) => {
                    res.should.have.status(401);
                    done();
                });
        });

        describe('update book', () => {
            it('givenBookDetails_whenProper_shouldUpdateBook', (done) => {
                chai.request(server).put('/book/60ccd5664df2c24d0c36a219')
                    .set('token', token)
                    .send(bookData.books.updateBookWithCorrectDetails)
                    .end((err, res) => {
                        res.should.have.status(200);
                        done();
                    });
            });

            it('givenBookDetails_whenWrong_shouldNotUpdateBook', (done) => {
                chai.request(server).put('/book/60ccd5664df2c24d0c36a219')
                    .set('token', token)
                    .send(bookData.books.updateBookWithInCorrectDetails)
                    .end((err, res) => {
                        res.should.have.status(400);
                        done();
                    });
            });

            it('givenToken_whenMissing_shouldNotUpdateBook', (done) => {
                chai.request(server).put('/book/60ccd5664df2c24d0c36a219')
                    .send(bookData.books.updateBookWithCorrectDetails)
                    .end((err, res) => {
                        res.should.have.status(401);
                        done();
                    });
            });

            it('givenBookDetails_whenWrongBookId_shouldNotUpdateBook', (done) => {
                chai.request(server).put('/book/60ccd5664df2c24d0c')
                    .set('token', token).send(bookData.books.updateBookWithCorrectDetails)
                    .end((err, res) => {
                        res.should.have.status(400);
                        done();
                    });
            });
        });

        describe('delete book', () => {
            it.skip('givenBookDetails_whenProper_shouldDeleteBook', (done) => {
                chai.request(server).put('/book/60f5ae8701c6cc3914c81439')
                    .set('token', token).end((err, res) => {
                        res.should.have.status(200);
                        done();
                    });
            });

            it('givenBookDetails_whenWrongBookId_shouldNotDeleteBook', (done) => {
                chai.request(server).put('/book/60f5ae8701c6cc31439')
                    .set('token', token)
                    .end((err, res) => {
                        res.should.have.status(400);
                        done();
                    });
            });

            it('givenBookDetails_whenMissingToken_shouldNotDeleteBook', (done) => {
                chai.request(server).delete('/book/60f5ae8701c6cc3914c81439')
                    .end((err, res) => {
                        res.should.have.status(401);
                        done();
                    });
            });
        });
        describe('retrieve books', () => {
            it('givenBookDetails_whenProper_shouldGetAllBook', (done) => {
                chai.request(server).get('/book')
                    .set('token', token).send()
                    .end((err, res) => {
                        res.should.have.status(200);
                        done();
                    });
            });

            it('givenBookDetails_whenMissingToken_shouldNotGetAllBook', (done) => {
                chai.request(server).get('/book')
                    .send().end((err, res) => {
                        res.should.have.status(401);
                        done();
                    });
            });

            it('getBooks_whenWrongToken_shouldNotSaveInDB', (done) => {
                chai.request(server).get('/book')
                    .set('token', bookData.books.credential.wrongToken)
                    .send()
                    .end((err, res) => {
                        res.should.have.status(401);
                        done();
                    });
            });
        });
    });
});
