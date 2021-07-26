/* eslint-disable indent */
// eslint-disable-next-line spaced-comment
/*************************************************************************
 * Execution        : 1. default node       cmd> npm start
 *
 * Purpose          : to hit Api of carts
 *
 * @file            : routes.js
 * @author          : Neeraj Malhotra
 * @version         : 1.0.0
 *
 **************************************************************************/
const cartModel = require('../models/cart');

class CartService {
    /**
     * 
     * @param {*} data 
     * @param {*} callback 
     * @description : addtoCart will take data from Controller and pass it to models.
     */
    addToCart = (data, callback) => {
        cartModel.addToCart(data, callback);
    }

    /**
     * 
     * @param {*} data 
     * @description : removeFromCart will take the data from controller and pass it to models
     */
    removeFromCart = (data) => {
        return new Promise((resolve, reject) => {
            const result = cartModel.removeFromCart(data);
            result.then((book) => resolve({ book }))
                .catch((err) => reject({ err }));
        });
    }
}

module.exports = new CartService();