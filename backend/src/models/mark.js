const mongoose = require('../database');

// "Tabela" do banco de dados com seus campos e tipos
const MarkSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    dia: {
        type: String,
        required: true
    },
    mes: {
        type: String,
        required: true
    },
    ano: {
        type: String,
        required: true
    },
    pontos:{
        type: Object,
        entrada:{
            type: String
        },
        almoco:{
            type: String
        },
        volta:{
            type: String
        },
        saida:{
            type: String
        }
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Mark = mongoose.model('Mark', MarkSchema);

module.exports = Mark;