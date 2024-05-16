var express = require('express');
var router = express.Router();
const Temporada = require("../../../models/Temporada.js");

router.post('/api/temporadas', async (req, res) => {
    let {temporada, estat, imatge, descripcio,
        enllac, episodis, valoracio} = req.body


    try {
        const result = await Temporada.create({temporada, estat, imatge,
            descripcio, enllac, episodis, valoracio})
        console.log(result);
        res.send(result)
    } catch (e) {
        console.log(e)
        res.send({success: false, message: 'ERROR!' + e.message})
    }
});

module.exports = router;