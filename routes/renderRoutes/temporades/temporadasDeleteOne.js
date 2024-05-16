var express = require('express');
var router = express.Router();
const Temporada = require("../../../models/Temporada.js");
const Serie = require("../../../models/Serie");

router.delete('/temporadas/:id', async (req, res) => {
    const id = req.params.id;

    let filterTemporadaOnSerie = {
        "temporadas._id": id
    }

    let filter = {_id: id}

    try {
        const serie = await Serie.findOne(filterTemporadaOnSerie);
        if (serie) {
            await Temporada.deleteOne(filter)
            serie.temporadas.pull(filter);
            await serie.save();
        }
        res.redirect('/temporadas')
    } catch (e) {
        console.log(e)
        res.send('ERROR' + e.message)
    }
})

module.exports = router;