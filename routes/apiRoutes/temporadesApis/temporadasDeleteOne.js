var express = require('express');
var router = express.Router();
const Temporada = require("../../../models/Temporada.js");
const Serie = require("../../../models/Serie.js");

router.delete('/api/temporadas/:id', async (req, res) => {
    const id = req.params.id;

    let filterSearchTemporadaInsideSerie = {
        "temporadas._id": id
    }

    let filterSearchByTemporadaId = {_id: id}

    try {
        const serie = await Serie.findOne(filterSearchTemporadaInsideSerie);

        if (serie) {
            await Temporada.deleteOne(filterSearchByTemporadaId)
            serie.temporadas.pull(filterSearchByTemporadaId);
            await serie.save();
            res.send(serie);
        } else {
            res.send({message: 'Temporada no encontrada'});
        }
    } catch (e) {
        console.log(e)
        res.send({message: 'ERROR!' + e.message});
    }
});


module.exports = router;

