var express = require('express');
var router = express.Router();
const Serie = require("../../../models/Serie.js");

router.post('/series/update', async (req, res) => {
    const {nom, estat, imatge, descripcio, idioma, enllac} = req.body;
    const id = req.body.id

    let filterToUpdate = {
        nom: nom, estat: estat, imatge: imatge, descripcio: descripcio, idioma: idioma, enllac: enllac
    }

    let filterToSelect = {_id: id}

    try {
        const result = await Serie.findOneAndUpdate(filterToSelect, filterToUpdate)
        console.log(result)

        res.redirect('/series')
    } catch (e) {
        console.log(e)
        return res.send({success: false, message: e.message});
    }

});

module.exports = router;