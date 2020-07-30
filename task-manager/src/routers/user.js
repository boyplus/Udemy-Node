const express = require('express');
const router = express.Router();
const User = require('../models/user');

router.post('/users', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save();
        res.status(201).send(user);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users);
    } catch (err) {
        res.status(500).send(err);
    }
});

router.get('/users/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const user = await User.findById(_id);
        if (!user) return res.status(404).send();
        res.send(user);
    } catch (err) {
        res.status(500).send();
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
        const user = await User.findByIdAndUpdate(_id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!user) return res.status(404).send();
        res.send(user);
    } catch (err) {
        res.status(400).send();
    }
});

router.delete('/users/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const user = await User.findByIdAndDelete(_id);
        if (!user) return res.status(404).send();
        res.send(user);
    } catch (error) {
        res.status(400).send();
    }
});

module.exports = router;
