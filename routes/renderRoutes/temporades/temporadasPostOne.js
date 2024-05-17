var express = require('express');
var router = express.Router();
const Temporada = require("../../../models/Temporada");
const Serie = require("../../../models/Serie");

router.post('/temporadas', async (req, res) => {
    let {temporada, estat, imatge, descripcio, enllac, episodis, valoracio, serie} = req.body

    let filterSerie = {_id: serie}

    try {
        const seriesToAddSerie = await Serie.findOne(filterSerie)
        const newTemporada = await Temporada.create({
            temporada,
            estat,
            imatge,
            descripcio,
            enllac,
            episodis,
            valoracio
        })
        seriesToAddSerie.temporadas.push(newTemporada)
        await seriesToAddSerie.save()

    } catch (e) {
        console.log(e)
    }

    res.redirect('/temporadas')
})

module.exports = router;