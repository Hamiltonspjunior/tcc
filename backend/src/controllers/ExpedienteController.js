const Expediente = require('../models/Expediente');

class ExpedienteController {
    async store(req, res){
        const expediente = await Expediente.create(req.body);
        return res.json(expediente);
    }

    async update(req,res){
        const expediente = await Expediente.findOneAndUpdate({name:req.params.name},req.body,function (err, expediente) {
            res.send(expediente);
        });
        return res.json(expediente);
    }

    async show(req, res){
        const expediente = await Expediente.findOne({name:req.params.name});
        return res.json(expediente);
    }
}

module.exports = new ExpedienteController();