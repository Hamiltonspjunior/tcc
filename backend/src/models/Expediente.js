const mongoose = require('mongoose');

const Expediente = new mongoose.Schema({
    name:{
       type: String,
       required: true 
    },
    entrada_manha:{
        type: String
    },
    entrada_almoco:{
        type: String
    },
    volta_almoco:{
        type: String
    },
    saida_expediente:{
        type: String
    }
}
    /*,{
        // Crie dois campos em cada registro da tabela/schema
        // Com a data de criação e de alteração de cada registro
        timestamps: true
    }*/
);

module.exports = mongoose.model('Expediente', Expediente);