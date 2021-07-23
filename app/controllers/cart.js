/* eslint-disable indent */
// eslint-disable-next-line spaced-comment
/*************************************************************************
 * Execution        : 1. default node       cmd> npm start
 *
 * Purpose          : to hit Api of carts
 *
 * @file            : cart.js
 * @author          : Neeraj Malhotra
 * @version         : 1.0.0
 *
 **************************************************************************/

const cartServices = require('../services/cart');

class CartController {
    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @description : add to cart will add the book into the cart.
     */
    addToCart = (req, res) => {
        try {
            const data = {
                bookId: req.body.bookId,
                userId: req.userId
            };
            cartServices.addToCart(data, (err) => {
                if (err) {
                    return res.status(400).send({
                        success: false,
                        message: 'Failed to add book in cart',
                        err,
                    });
                }
                return res.status(200).send({
                    success: true,
                    message: 'Book added to cart successfully'
                });
            });
        } catch (err) {
            res.status(500).send({
                success: false,
                message: 'Internal error from the server',
            });
        }
    }
}

module.exports = new CartController();