const express = require('express');
const authMiddleware = require('../middlewares/auth');

const Mark = require('../models/mark');

const router = express.Router();

// Utiliza o middleware pq a rota precisa ser autenticada
router.use(authMiddleware);

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


// Listar por range de data, espera o range de data no formato YYYY-MM-DAY string en-US no toLocalString.
router.get('/range/:userId/', async(req, res) => {
    try {
        const marks = await Mark.find({user: req.params.userId}).where('date').gt(new Date(req.query.dateStart)).lt(new Date(req.query.dateEnd)).populate('MarksRage');

        return res.send({ marks });

    } catch (err) {
        return res.status(400).send({ error: 'Error loading markings' });
    }
});

// Listar por data, espera data no formato YYYY-MM-DAY string en-US no toLocalString.

router.get('/date/:userId', async(req, res) => {
    try {
        const marks = await Mark.find({user: req.params.userId }).where({date :new Date(req.body.date)});

        return res.send({ marks });

    } catch (err) {
        return res.status(400).send({ error: 'Error loading markings' });
    }
});

module.exports = app => app.use('/lists', router);