const express = require('express');
const router = express.Router();
const User = require('../models/user');

const auth = require('../middleware/auth');

router.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (err) {
        res.status(400).send(err);
    }
});

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(
            req.body.email,
            req.body.password
        );
        const token = await user.generateAuthToken();
        res.send({ user, token });
    } catch (err) {
        res.status(400).send();
    }
});

router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });
        await req.user.save();
        res.send();
    } catch (error) {
        res.status(500).send();
    }
});

router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = [];
        await req.user.save();
        res.send();
    } catch (error) {
        res.status(500).send();
    }
});

router.get('/users/me', auth, async (req, res) => {
    res.send(req.user);
});

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const user = await User.findById(_id);
        if (!user) return res.status(404).send();
        res.send(user);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.patch('/users/:id', async (req, res) => {
    const _id = req.params.id;
    const updates = Object.keys(req.body);
    const allowUpdated = ['name', 'email', 'password', 'age'];
    const isValidOperation = updates.every((update) =>
        allowUpdated.includes(update)
    );
    if (!isValidOperation)
        return res.status(400).send({ error: 'Invalid updated!' });
    try {
        const user = await User.findById(_id);
        if (!user) return res.status(404).send();
        updates.forEach((update) => (user[update] = req.body[update]));
        await user.save();
        res.send(user);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.delete('/users/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const user = await User.findByIdAndDelete(_id);
        if (!user) return res.status(404).send();
        res.send(user);
    } catch (err) {
        res.status(400).send(err);
    }
});

module.exports = router;
