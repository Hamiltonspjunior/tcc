const mongoose = require('mongoose');

const Box = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    files: [ { type: mongoose.Schema.Types.ObjectId, ref: 'File' }  ]
}, {
    // Crie dois campos em cada registro da tabela/schema
    // Com a data de criação e de alteração de cada registro
    timestamps: true
});

module.exports = mongoose.model('Box', Box);