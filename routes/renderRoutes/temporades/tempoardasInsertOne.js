var express = require('express');
var router = express.Router();
const Temporada = require("../../../models/Temporada.js");

router.get('/temporadas/insert', async (req, res) => {
    let filter = {}

    try {
        const taula = await Temporada.find(filter)
        console.log(taula)
        const options = {
            title: "Insertar temporada | Netflow",
            temporadas: taula,
        }
        res.render('./views_temporades/insertar_temporades.ejs', options)
    } catch (e) {
        console.log(e)
        res.send('ERROR' + e.message)
    }

});

module.exports = router;