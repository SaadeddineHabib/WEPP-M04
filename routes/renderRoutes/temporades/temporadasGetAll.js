var express = require('express');
var router = express.Router();
const Temporada = require("../../../models/Temporada.js");

router.get('/temporadas', async (req, res) => {
    let filter = {}

    try {
        const taulaTemporadas = await Temporada.find(filter)
        const options = {
            title: "Temporades | Netflow",
            temporadas: taulaTemporadas,
        }
        res.render('./views_temporades/temporades.ejs', options)
    } catch (e) {
        console.log(e)
        res.send('ERROR' + e.message)
    }
})

module.exports = router;