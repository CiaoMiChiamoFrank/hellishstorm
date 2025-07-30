const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/hellishstorm').then('connessione avvenuta con successo!')

module.exports = mongoose