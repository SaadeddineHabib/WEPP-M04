var express = require('express');
var router = express.Router();
const Temporada = require("../../../models/Temporada.js");
const Serie = require("../../../models/Serie.js");

router.post('/api/temporadas/:id', async (req, res) => {
    const id = req.params.id
    let {temporada, estat, imatge, descripcio, enllac, episodis, valoracio} = req.body

    let filterToUpdate = {
        temporada: temporada,
        estat: estat,
        imatge: imatge,
        descripcio: descripcio,
        enllac: enllac,
        episodis: episodis,
        valoracio: valoracio
    }

    let filterTemporadaOnSerie = {
        "temporadas._id": id
    }

    let filterToSelect = {_id: id}

    try {
        const temporada = await Temporada.findOneAndUpdate(filterToSelect, filterToUpdate, {new: true})
        const serie = await Serie.findOne(filterTemporadaOnSerie);
        serie.temporadas.pull(filterToSelect)
        serie.temporadas.push(temporada)
        await serie.save();
        res.send(temporada)
    } catch (e) {
        console.log(e)
        res.send({success: false, message: 'ERROR' + e.message});
    }
});

module.exports = router;