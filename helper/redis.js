/* eslint-disable indent */
/**
 * @description : creating redis cache file for redisCache
 */
const redis = require('redis');
// const { addBook } = require('../app/services/book');

const client = redis.createClient();

class Redis {

    redisFunction = (KEY, value) => {
        client.setex(KEY, 1200, JSON.stringify(value));
    };
    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @description : redisMiddleware will take the request in key value pair to process it.
     */
    redisMiddleWare(req, res, next) {
        client.get('book', (err, book) => {
            if (err) throw err;

            if (book !== null) {
                console.log('books fetch from redis');
                res.send({
                    succes: true,
                    message: 'fetching from redis',
                    data: JSON.parse(book),
                });
            } else {
                next();
            }
        });
    }
}

module.exports = new Redis();