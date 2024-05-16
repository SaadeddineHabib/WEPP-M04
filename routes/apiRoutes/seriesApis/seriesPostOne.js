var express = require('express');
var router = express.Router();
const serie = require("../../../models/Serie.js");

router.post('/api/series', async (req, res) => {
    let {nom, estat, imatge, descripcio, idioma, temporadas, enllac} = req.body

    console.log({nom, estat, imatge, descripcio, idioma, temporadas, enllac})

    try {
        await serie.create({nom, estat, imatge, descripcio, idioma, temporadas, enllac});
        res.send({success: true, message: "S'ha afagit nova informacio a la taula seriesRender"})
    } catch (e) {
        console.log(e)
        res.send({success: false, message: 'ERROR!' + e.message})
    }
})

module.exports = router;