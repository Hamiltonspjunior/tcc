const mongoose = require('../database');

// "Tabela" do banco de dados com seus campos e tipos
const MarkSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: Date,
        required: true
    },
    marks:{
        type: Array
    },
    occurrence:{
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Mark = mongoose.model('Mark', MarkSchema);

module.exports = Mark;