const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Get all products
router.get('/', (req, res) => {

    const sql = 'SELECT * FROM products';

    db.query(sql, (err, results) => {

        if (err) {
            console.log(err);
            return res.status(500).json({
                message: 'Error fetching products'
            });
        }

        res.json(results);
    });

});

// Add new product
router.post('/add', (req, res) => {

    const { name, description, price, image } = req.body;

    const sql =
    'INSERT INTO products (name, description, price, image) VALUES (?, ?, ?, ?)';

    db.query(
        sql,
        [name, description, price, image],
        (err, result) => {

            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: 'Error adding product'
                });
            }

            res.json({
                message: 'Product added successfully'
            });
        }
    );

});

module.exports = router;