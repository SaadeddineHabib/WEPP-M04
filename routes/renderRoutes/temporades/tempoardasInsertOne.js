var express = require('express');
var router = express.Router();
const Temporada = require("../../../models/Temporada.js");
const Serie = require("../../../models/Serie");

router.get('/temporadas/insert', async (req, res) => {
    let filter = {}

    try {
        const temporades = await Temporada.find(filter)
        const series = await Serie.find(filter);
        console.log(temporades)
        const options = {
            title: "Insertar temporada | Netflow",
            temporadas: temporades,
            series: series
        }
        res.render('./views_temporades/insertar_temporades.ejs', options)
    } catch (e) {
        console.log(e)
        res.send('ERROR' + e.message)
    }

});

module.exports = router;