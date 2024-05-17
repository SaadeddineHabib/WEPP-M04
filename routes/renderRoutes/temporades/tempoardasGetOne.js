var express = require('express');
var router = express.Router();
const Temporada = require("../../../models/Temporada.js");

router.get('/temporadas/:id', async (req, res) => {
    let id = req.params.id

    let filter = {_id: id}

    try {
        const temporada = await Temporada.findOne(filter)
        const options = {
            title: 'Temporada  | Netflow',
            tempo: temporada
        }
        res.render('./views_temporades/ver_detalles_temporades.ejs', options)
    } catch (e) {
        console.log(e)
        res.send('ERROR ' + e.message)
    }


})

module.exports = router;