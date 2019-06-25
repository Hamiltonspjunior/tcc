const express = require('express');
const authMiddleware = require('../middlewares/auth');

const Mark = require('../models/mark');

const router = express.Router();

// Utiliza o middleware pq a rota precisa ser autenticada
router.use(authMiddleware);

// Marcar a hora
router.post('/', async(req, res) => {
    try {
        const mark = await Mark.create({...req.body, user: req.userId });

        return res.send({ mark });

    } catch (err) {
        return res.status(400).send({ error: 'Error creating new marking' });
    }
});

// Listar todas marcações
router.get('/', async(req, res) => {
    try {
        const marks = await Mark.find({user: req.userId}).populate('user');

        return res.send({ marks });

    } catch (err) {
        return res.status(400).send({ error: 'Error loading markings' });
    }
});

// Listar marcação por id
router.get('/:userId', async(req, res) => {
    try {
        const marks = await Mark.findById(req.params.userId).populate('user');

        return res.send({ marks });

    } catch (err) {
        return res.status(400).send({ error: 'Error loading markings' });
    }
});

router.put('/:userId', async(req, res) => {
    return res.send({ user: req.userId });
});

router.delete('/:userId', async(req, res) => {
    try {
        await Mark.findByIdAndRemove(req.params.userId);

        return res.send({ message: "Deletado" });

    } catch (err) {
        return res.status(400).send({ error: 'Error deleting markings' });
    }
});

module.exports = app => app.use('/mark', router);