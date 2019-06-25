const mongoose = require('../database');
const bcrypt = require('bcryptjs');

// "Tabela" do banco de dados com seus campos e tipos
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

// Antes de salvar o usuário criptografa a senha
UserSchema.pre('save', async function(next){
    // Objeto que está sendo salvo
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
})

const User = mongoose.model('User', UserSchema);

module.exports = User;