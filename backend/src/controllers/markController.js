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


// Listar por range de data, espera o range de data no formato YYYY-MM-DAY string en-US no toLocalString.
router.get('/range/:userId', async(req, res) => {
    try {
        const marks = await Mark.find({user: req.params.userId}).where('date').gt(new Date(req.body.dateStart)).lt(new Date(req.body.dateEnd))

        return res.send({ marks });

    } catch (err) {
        return res.status(400).send({ error: 'Error loading markings' });
    }
});

//atualizar as marcações , passar o id do usuario por parametro , e no body passar date , e a marcação
router.patch('/', async(req, res) => {
    try {
       await Mark.update({user: req.userId , date: new Date(req.body.date)},{ $addToSet: { marks: req.body.marks }})

        return res.send({ message: "Sucesso!"});

    } catch (err) {
        return res.status(400).send({ error: ' === ' + req.userId});
    }
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