var express = require('express');
var router = express.Router();
const Serie = require("../../../models/Serie.js");

router.post('/api/series/:id', async (req, res) => {
    const id = req.params.id
    const {nom, estat, imatge, descripcio, temporadas, idioma, enllac} = req.body;

    let filterToUpdate = {
        nom: nom,
        estat: estat,
        imatge: imatge,
        descripcio: descripcio,
        idioma: idioma,
        enllac: enllac,
        temporadas: temporadas

    }
    let filterToSelect = {_id: id}

    try {
        const result = await Serie.findOneAndUpdate(filterToSelect, filterToUpdate)

        if (!result) {
            return res.send("la serie amb el id  " + id + " no s'ha trobat")
        } else {
            return res.send(result)
        }
    } catch (e) {
        console.log(e)
        res.send({success: false, message: e.message});
    }
});

module.exports = router;