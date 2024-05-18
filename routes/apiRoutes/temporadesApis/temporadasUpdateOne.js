var express = require('express');
var router = express.Router();
const Temporada = require("../../../models/Temporada.js");
const Serie = require("../../../models/Serie.js");

router.post('/api/temporadas/:id', async (req, res) => {
    const id = req.params.id
    let {temporada, estat, imatge, descripcio, enllac, episodis, valoracio, serieOfTempo} = req.body

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
        await addTemporadaToSerie(temporada, serieOfTempo)
        res.send(temporada)
    } catch (e) {
        console.log(e)
        res.send({success: false, message: 'ERROR' + e.message});
    }
});


async function addTemporadaToSerie(temporada, serieOfTempo) {
    let filterTemporadaOnSerie = {
        "temporadas._id": temporada._id
    }
    let filterToSelect = {_id: temporada._id}


    if (serieOfTempo === null || serieOfTempo === "") {
        return -1
    } else {
        let filtertoSelectSerie = {_id: serieOfTempo}
        const serie = await Serie.findOne(filterTemporadaOnSerie);
        if (serie === null) {
            const newSerie = await Serie.findOne(filtertoSelectSerie)
            if (newSerie === null) {
                return -1
            }
            newSerie.temporadas.push(temporada)
            await newSerie.save()
            return 1
        } else if (serie._id.toString() !== serieOfTempo) {
            serie.temporadas.pull(filterToSelect)
            const newSerie = await Serie.findOne(filtertoSelectSerie)
            if (newSerie === null) {
                return -1
            }
            newSerie.temporadas.push(temporada)
            await newSerie.save()
            await serie.save()
            return 1
        } else {
            serie.temporadas.pull(filterToSelect)
            serie.temporadas.push(temporada)
            await serie.save()
            return 1
        }
    }




}

module.exports = router;