var express = require('express');
var router = express.Router();
const Serie = require("../../../models/Serie.js");

router.get('/api/series/:id', async (req, res) => {
    let id = req.params.id
    let filter = {_id: id}

    try {
        const serieOne = await Serie.find(filter)
        return res.send(serieOne)
    } catch (e) {
        console.log(e)
        res.send('ERROR ' + e.message)
    }

})


module.exports = router;