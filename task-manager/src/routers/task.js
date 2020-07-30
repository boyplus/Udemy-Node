const express = require('express');
const router = express.Router();
const Task = require('../models/user');

router.post('/tasks', async (req, res) => {
    const task = new Task(req.body);
    try {
        await task.save();
        res.status(201).send(task);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({});
        res.send(tasks);
    } catch (err) {
        res.status(500).send();
    }
});

router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const task = await Task.findById(_id);
        if (!task) return res.status(404).send();
        res.send(task);
    } catch (err) {
        res.status(500).send();
    }
});

router.patch('/tasks/:id', async (req, res) => {
    const _id = req.params.id;
    const updates = Object.keys(req.body);
    const allowUpdated = ['description', 'completed'];
    const isValidOperation = updates.every((update) =>
        allowUpdated.includes(update)
    );
    if (!isValidOperation)
        return res.status(400).send({ error: 'Invalid update.' });
    try {
        const task = await Task.findByIdAndUpdate(_id, req.body, {
            new: true,
            runValidators: true,
        });
        res.send(task);
    } catch (err) {
        res.status(400).send(e);
    }
});

router.delete('/tasks/:id', async (req, res) => {
    const _id = req.params.id;
    try {
        const task = await Task.findByIdAndDelete(_id);
        if (!task) return res.status(404).send();
        res.send(task);
    } catch (error) {
        res.status(400).send();
    }
});

module.exports = router;
