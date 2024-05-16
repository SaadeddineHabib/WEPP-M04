var express = require('express');
var router = express.Router();
const Temporada = require("../../../models/Temporada");

router.post('/temporadas', async (req, res) => {
    let {temporada, estat, imatge, descripcio, enllac, episodis, valoracio} = req.body

    try {
        const result =  await Temporada.create({temporada, estat, imatge, descripcio, enllac, episodis, valoracio})
    } catch (e) {
        console.log(e)
    }

    res.redirect('/temporadas')
})

module.exports = router;