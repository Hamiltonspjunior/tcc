const Expediente = require('../models/Expediente');

class ExpedienteController {
    async store(req, res){
        const expediente = await Expediente.create(req.body);

        return res.json(expediente)
    }

    async show(req, res){
        const expediente = await Expediente.findById(req.params.name);

        return res.json(expediente);
    }
}

module.exports = new ExpedienteController();