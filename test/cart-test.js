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

let userToken = '';

describe('Cart', () => {
    before((done) => {
        chai.request(server).post('/userLogin')
            .send(loginData.user.userLogin)
            .end((err, res) => {
                userToken = res.body.token;
                done();
            });
    });
    describe('add book to cart', () => {
        it('givenBookDetails_whenCorrect_shouldAddBookInCart', (done) => {
            chai.request(server).post('/addToCart')
                .set('token', userToken)
                .send(bookData.books.addBookWithProperProperties)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });

        it.skip('givenBookDetails_whenInCorrect_shouldNotAddBookInCart', (done) => {
            chai.request(server).post('/addToCart')
                .set('token', userToken)
                .send(bookData.books.addBookWithImProperProperties)
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });

        it('givenBookDetails_whenMissingToken_shouldNotAddBookInCart', (done) => {
            chai.request(server).post('/addToCart')
                .send(bookData.books.addBookWithProperProperties)
                .end((err, res) => {
                    res.should.have.status(401);
                    done();
                });
        });

        it('givenBookDetails_whenWrongToken_shouldNotAddBookInCart', (done) => {
            chai.request(server).post('/addToCart')
                .set('token', bookData.books.credential.wrongToken)
                .send(bookData.books.addBookWithProperProperties)
                .end((err, res) => {
                    res.should.have.status(401);
                    done();
                });
        });
    });
});
