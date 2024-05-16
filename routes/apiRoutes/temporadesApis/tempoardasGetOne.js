var express = require('express');
var router = express.Router();
const Temporada = require("../../../models/Temporada.js");

router.get('/api/temporadas/:id', async (req, res) => {
    let id = req.params.id
    let filter = {_id: id}

    try {
        const temporada = await Temporada.find(filter)
        res.send(temporada)
    } catch (e) {
        console.log(e)
        res.send('ERROR ' + e.message)
    }

})

module.exports = router;