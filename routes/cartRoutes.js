const express = require('express');

const db = require('../config/db');

const auth = require('../middleware/authMiddleware');

const router = express.Router();


// ADD TO CART

router.post('/add', auth, (req, res) => {

    const { product_id, quantity } = req.body;

    const sql =
        'INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)';

    db.query(
        sql,
        [req.user.id, product_id, quantity],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: 'Added to cart'
            });

        }
    );

});


// GET CART ITEMS

router.get('/', auth, (req, res) => {

    const sql = `
        SELECT
            cart.id,
            products.name,
            products.price,
            cart.quantity

        FROM cart

        JOIN products
        ON cart.product_id = products.id

        WHERE cart.user_id = ?
    `;

    db.query(
        sql,
        [req.user.id],
        (err, results) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json(results);

        }
    );

});


// INCREASE QUANTITY

router.put('/increase/:id', auth, (req, res) => {

    const sql =
        'UPDATE cart SET quantity = quantity + 1 WHERE id = ? AND user_id = ?';

    db.query(
        sql,
        [req.params.id, req.user.id],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: 'Quantity Increased'
            });

        }
    );

});


// DECREASE QUANTITY

router.put('/decrease/:id', auth, (req, res) => {

    const sql =
        'UPDATE cart SET quantity = GREATEST(quantity - 1, 1) WHERE id = ? AND user_id = ?';

    db.query(
        sql,
        [req.params.id, req.user.id],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: 'Quantity Decreased'
            });

        }
    );

});


// REMOVE ITEM

router.delete('/remove/:id', auth, (req, res) => {

    const sql =
        'DELETE FROM cart WHERE id = ? AND user_id = ?';

    db.query(
        sql,
        [req.params.id, req.user.id],
        (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json({
                message: 'Item Removed Successfully'
            });

        }
    );

});

module.exports = router;
