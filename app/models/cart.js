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
const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Registration'
    },
    bookId: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Books'
    }],
    isPurchased: {
        type: Boolean, default: false
    },
},
    {
        versionKey: false,
    },
    {
        timestamps: true,
    }
);

const cartModel = mongoose.model('Cart', cartSchema);

class CartModels {
    /**
     * 
     * @param {*} data 
     * @param {*} callback 
     * @description : addToCart will take the request from services and process it and save details in Db.
     */
    addToCart = async (data, callback) => {
        const user = await cartModel.findOne({ userId: data.userId });
        if (!user) {
            const cartDetails = new cartModel({
                bookId: data.bookId,
                userId: data.userId,
            });
            cartDetails.save()
            callback(null, 'book added to cart')
        } else {
            const result = await cartModel.findOneAndUpdate({ userId: data.userId },
                { $addToSet: { bookId: data.bookId } });
            callback(null, result);
        }
    }

    /**
     * 
     * @param {*} data 
     * @description : removeFromCart will remove the book from cart and update the Db.
     */
    removeFromCart = (data) => {
        return new Promise((resolve, reject) => {
            cartModel.findOneAndUpdate({ userId: data.userId }, { $pull: { bookId: data.bookId } })
                .then((book) => resolve(book))
                .catch((err) => reject(err));
        });
    }
}

module.exports = new CartModels();