var express = require('express');
var router = express.Router();
const Temporada = require("../../../models/Temporada.js");
const Serie = require("../../../models/Serie.js");

router.delete('/api/temporadas/:id', async (req, res) => {
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
            res.send(serie);
        } else {
            res.status(404).send({message: 'Temporada no encontrada'});
        }
    } catch (e) {
        console.log(e)
        res.status(500).send({message: 'ERROR!' + e.message});
    }
});

module.exports = router;

