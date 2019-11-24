const mongoose = require('mongoose');

// Url do MongoDb Atalas online: mongodb+srv://admin:Ifsp@2019@cluster0-re2z0.mongodb.net/tcc?retryWrites=true&w=majority
// Localhost: mongodb://localhost/tcc
mongoose.connect('mongodb://localhost:27017/tcc', { useCreateIndex: true, useNewUrlParser: true });
mongoose.Promise = global.Promise;

module.exports = mongoose;