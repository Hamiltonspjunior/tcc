const mongoose = require('mongoose');

const Expediente = new mongoose.Schema({
    name:{
       type: String,
       required: true 
    },
    entrada_manha:{
        type: Date
    },
    entrada_almoco:{
        type: Date
    },
    volta_almoco:{
        type: Date
    },
    saida_expediente:{
        type: Date
    }
},{
    // Crie dois campos em cada registro da tabela/schema
    // Com a data de criação e de alteração de cada registro
    timestamps: true
});

module.exports = mongoose.model('Expediente', Expediente);