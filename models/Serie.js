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

const serieSchema = new mongoose.Schema({
    nom: String,
    estat: String,
    imatge: String,
    descripcio: String,
    idioma: String,
    temporadas: [temporadaSchema],
    enllac: String
});

const Serie = mongoose.model('Serie', serieSchema);

module.exports = Serie
