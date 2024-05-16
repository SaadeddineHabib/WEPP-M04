const mongoose = require('mongoose');

const temporadaSchema = new mongoose.Schema({
    temporada: Number,
    estat: String,
    imatge: String,
    descripcio: String,
    enllac: String,
    episodis: Number,
    valoracio: Number

});

const Temporada = mongoose.model('Temporada', temporadaSchema);

module.exports = Temporada
