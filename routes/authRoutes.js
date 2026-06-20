const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

const router = express.Router();


// ================= REGISTER =================

router.post('/register', async (req, res) => {

    const {
        name,
        email,
        phone,
        password
    } = req.body;

    try {

        const hashedPassword =
            await bcrypt.hash(password, 10);

        const sql =
            `INSERT INTO users
            (name, email, phone, password)
            VALUES (?, ?, ?, ?)`;

        db.query(
            sql,
            [
                name,
                email,
                phone,
                hashedPassword
            ],
            (err, result) => {

                if (err) {

                    return res.status(500).json({
                        message: err.message
                    });

                }

                res.json({
                    success: true,
                    message:
                    'Registration Successful'
                });

            }
        );

    }
    catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

});


// ================= LOGIN =================

router.post('/login', (req, res) => {

    const {
        email,
        password
    } = req.body;

    const sql =
        'SELECT * FROM users WHERE email = ?';

    db.query(
        sql,
        [email],
        async (err, results) => {

            if (err) {

                return res.status(500).json(err);

            }

            if (results.length === 0) {

                return res.status(400).json({
                    message: 'User not found'
                });

            }

            const user =
                results[0];

            const validPassword =
                await bcrypt.compare(
                    password,
                    user.password
                );

            if (!validPassword) {

                return res.status(400).json({
                    message:
                    'Invalid Password'
                });

            }

            const token =
                jwt.sign(
                    { id: user.id },
                    process.env.JWT_SECRET
                );

            res.json({
                token,
                message:
                'Login Successful'
            });

        }
    );

});

module.exports = router;