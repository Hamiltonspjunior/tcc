const mongoose = require('mongoose');

// Url do MongoDb Atalas online: mongodb+srv://admin:Ifsp@2019@cluster0-re2z0.mongodb.net/tcc?retryWrites=true&w=majority
// Localhost: mongodb://localhost/tcc
<<<<<<< HEAD
mongoose.connect('mongodb+srv://admin:Ifsp@2019@cluster0-re2z0.mongodb.net/tcc?retryWrites=true&w=majority', { useNewUrlParser: true });
=======
mongoose.connect('mongodb://localhost:27017/tcc', { useCreateIndex: true, useNewUrlParser: true });
>>>>>>> 8770afaddc07b7c563e5709e7a0873a94f3fbf70
mongoose.Promise = global.Promise;

module.exports = mongoose;