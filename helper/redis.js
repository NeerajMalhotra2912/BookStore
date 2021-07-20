/* eslint-disable indent */
const redis = require('redis');
const { addBook } = require('../app/services/book');

const client = redis.createClient();

class Redis {
    redisFunction = (KEY, value) => {
        client.setex(KEY, 1200, JSON.stringify(value));
    };
    redisMiddleWare = (req, res, next) => {
        client.get('book', (err, book) => {
            if (err) {
                throw err;
            } else if (addBook) {
                res.send(JSON.parse(book));
            } else {
                next();
            }
        });
    };
}

module.exports = new Redis();