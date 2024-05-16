const express = require('express');
const router = express.Router();
const Temporada = require("../../../models/Temporada.js");

router.get('/api/temporadas', async (req, res) => {
    let filter = {}

    try {
        const temporadas = await Temporada.find(filter)
        res.send(temporadas)
    } catch (e) {
        console.log(e)
        res.send('ERROR' + e.message)
    }
})

module.exports = router;