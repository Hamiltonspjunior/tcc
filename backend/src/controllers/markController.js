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

//atualizar as marcações , passar o id do usuario por parametro , e no body passar date , e a marcação
router.patch('/', async(req, res) => {
    try {
       await Mark.update({user: req.userId , date: new Date(req.body.date)},{ $addToSet: { marks: req.body.marks }})

        return res.send({ message: "Sucesso!"});

    } catch (err) {
        return res.status(400).send({ error: ' === ' + req.userId});
    }
});



router.patch('/occurrence', async(req, res) => {
    try {
       await Mark.updateOne({user: req.userId , date: new Date(req.body.date)},{ $set: { occurrence: req.body.occurrence }})

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