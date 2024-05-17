var express = require('express');
var router = express.Router();
const Serie = require("../../../models/Serie.js");
const Temporada = require("../../../models/Temporada.js");


router.get('/series/update/:id', async (req, res) => {
    const id = req.params.id;
    let filter = {_id: id}

    try {
        const serie = await Serie.findOne(filter)
        const options = {
            title: 'Actualitzar ' + serie.nom + ' | Netflow',
            serie: serie
        }
        res.render('./views_series/actualitzar_series.ejs', options)
    } catch (e) {

        console.log(e)
        res.send('ERROR' + e.message)
    }
});

module.exports = router;