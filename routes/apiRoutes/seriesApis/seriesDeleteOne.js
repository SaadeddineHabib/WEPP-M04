var express = require('express');
var router = express.Router();
const Serie = require("../../../models/Serie.js");

router.delete('/api/series/:id', async (req, res) => {
    const id = req.params.id;
    let filter = {_id: id}

    try {
        const taula = await Serie.deleteOne(filter);

        if (taula) {
            res.send({success: true, message: 'Serie amb id ' + id + ' Ha sigut eliminat'})
        } else {
            res.send({success: false, message: 'id no trobat.'});
        }
    } catch (e) {
        console.log(e)
        res.json('ERROR' + e.message)
    }
})

module.exports = router;