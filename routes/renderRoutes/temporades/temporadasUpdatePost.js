var express = require('express');
var router = express.Router();
const Temporada = require("../../../models/Temporada.js");
const Serie = require("../../../models/Serie");

router.post('/temporadas/update', async (req, res) => {
    const {temporada, estat, imatge, descripcio, enllac, episodis, valoracio, serieOfTempo} = req.body;
    const id = req.body.id

    console.log(req.body)

    let filterToUpdate = {
        temporada: temporada,
        estat: estat,
        imatge: imatge,
        descripcio: descripcio,
        enllac: enllac,
        episodis: episodis,
        valoracio: valoracio
    }

    let filterToSelect = {_id: id}

    try {
        const temporada = await Temporada.findOneAndUpdate(filterToSelect, filterToUpdate, {new: true})
        console.log(temporada)
        await change_temporada_on_serie(temporada, serieOfTempo)
        res.redirect('/temporadas')
    } catch (e) {
        console.log(e)
        return res.send({success: false, message: e.message});
    }
});


async function change_temporada_on_serie(temporada, serieOfTempo) {
    let filterTemporadaOnSerie = {
        "temporadas._id": temporada._id
    }
    let filterToSelect = {_id: temporada._id}

    let filtertoSelectSerie = {_id: serieOfTempo}

    const serie = await Serie.findOne(filterTemporadaOnSerie);
    console.log(serie)
    if (serie === null) {
        const newSerie = await Serie.findOne(filtertoSelectSerie)
        console.log(newSerie)
        newSerie.temporadas.push(temporada)
        await newSerie.save()
    } else if (serieOfTempo !== serie._id) {
        serie.temporadas.pull(filterToSelect)
        const newSerie = await Serie.findOne(filtertoSelectSerie)
        newSerie.temporadas.push(temporada)
        await newSerie.save()
        await serie.save()
    } else {
        serie.temporadas.pull(filterToSelect)
        serie.temporadas.push(temporada)
        await serie.save()
    }

}

module.exports = router;