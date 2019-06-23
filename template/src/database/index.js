const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:Ifsp@2019@cluster0-re2z0.mongodb.net/tcc?retryWrites=true&w=majority', { useNewUrlParser: true });
mongoose.Promise = global.Promise;

module.exports = mongoose;