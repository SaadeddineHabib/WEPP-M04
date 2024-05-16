var express = require('express');
var router = express.Router();
const Serie = require("../../../models/Serie.js");

router.post('/series', async (req, res) => {
    let {nom, estat, imatge, descripcio, idioma, enllac} = req.body

    try {
        const result = await Serie.create({nom, estat, imatge, descripcio, idioma, enllac})
        console.log(result)
    } catch (e) {
        console.log(e)
    }
    res.redirect('/series')
})

module.exports = router;