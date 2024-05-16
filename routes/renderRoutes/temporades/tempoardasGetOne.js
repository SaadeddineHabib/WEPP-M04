var express = require('express');
var router = express.Router();
const Temporada = require("../../../models/Temporada.js");

router.get('/temporadas/:id', async (req, res) => {
    let id = req.params.id

    let filter = {_id: id}

    try {
        const result = await Temporada.find(filter)
        const options = {
            title: 'Temporada | Netflow',
            tempo: result[0]
        }
        res.render('./views_temporades/ver_detalles_temporades.ejs', options)
    } catch (e) {
        console.log(e)
        res.send('ERROR ' + e.message)
    }


})

module.exports = router;