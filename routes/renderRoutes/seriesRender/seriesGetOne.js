var express = require('express');
var router = express.Router();
const Serie = require("../../../models/Serie.js");

router.get('/series/:id', async (req, res) => {
    let id = req.params.id
    let filter = {_id: id}

    try {
        const taula = await Serie.findOne(filter)
        const options = {
            title: 'Serie ' + taula.nom + ' | Netflow',
            serie: taula
        }
        res.render('./views_series/ver_detalles_series.ejs', options)
    } catch (e) {
        console.log(e)
        res.status(500).send('ERROR ' + e.message)
    }


});

module.exports = router;