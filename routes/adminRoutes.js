const express = require('express');

const db = require('../config/db');

const router = express.Router();


// GET ALL ORDERS

router.get('/orders', (req, res) => {

    const sql =
        'SELECT * FROM orders';

    db.query(sql, (err, results) => {

        if (err) {

            return res.status(500).json(err);

        }

        res.json(results);

    });

});


// UPDATE TRACKING STATUS

router.put('/orders/:id', (req, res) => {

    const { tracking_status } = req.body;

    const sql =
        'UPDATE orders SET tracking_status = ? WHERE id = ?';

    db.query(
        sql,
        [tracking_status, req.params.id],
        (err, result) => {

            if (err) {

                return res.status(500).json(err);

            }

            res.json({
                message: 'Tracking Status Updated Successfully'
            });

        }
    );

});

module.exports = router;