var express = require('express');
var router = express.Router();
const Temporada = require("../../../models/Temporada.js");
const Serie = require("../../../models/Serie.js");

router.get('/temporadas/update/:id', async (req, res) => {
    const id = req.params.id;

    let filterOne = {_id: id}
    let filterAll = {}


    try {
        const temporada = await Temporada.findOne(filterOne)
        const series = await Serie.find(filterAll)

        //TODO: HAY QUE VER COMO PODEMOS PASARLE TODA LA INFORMACION DENTRO DEL ARRAY TEMPORADAS PORQUE EL FIND
        // SOLO MUESTRA EL TIPO DE DATO QUE HAY DENTRO DEL ARRAY


        console.log(temporada._id)
        for (let i = 0; i < series.length; i++) {
            for (let j = 0; j < series[i].temporadas.length; j++) {
                console.log(series[i].temporadas[j])
            }
        }

        const options = {
            title: 'Actualitzar temporada | Netflow',
            series: series,
            tempo: temporada
        }
        res.render('./views_temporades/actualitzar_temporades.ejs', options)
    } catch (e) {
        console.log(e)
        return res.send('ERROR' + e.message)
    }
});

module.exports = router;