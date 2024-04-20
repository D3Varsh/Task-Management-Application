const express = require('express');
const router = express.Router();
const User = require('../models/user.model.js');

// Route for user login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findByCredentials(email, password);
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (error) {
        res.status(400).send({ error: 'Invalid credentials' });
    }
});

module.exports = router;
