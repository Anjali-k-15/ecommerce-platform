const express = require('express');

const db = require('../config/db');

const auth = require('../middleware/authMiddleware');

const router = express.Router();


// CREATE ORDER

router.post('/create', auth, (req, res) => {

    const { total } = req.body;

    const sql =
        `INSERT INTO orders
        (user_id, total, status, tracking_status)
        VALUES (?, ?, ?, ?)`;

    db.query(
        sql,
        [
            req.user.id,
            total,
            'Paid',
            'Order Placed'
        ],
        (err, result) => {

            if (err)
                return res.status(500).json(err);

            res.json({
                message: 'Order placed successfully'
            });

        }
    );

});


// GET USER ORDERS

router.get('/', auth, (req, res) => {

    const sql =
        'SELECT * FROM orders WHERE user_id = ? ORDER BY id DESC';

    db.query(
        sql,
        [req.user.id],
        (err, results) => {

            if (err)
                return res.status(500).json(err);

            res.json(results);

        }
    );

});

module.exports = router;

