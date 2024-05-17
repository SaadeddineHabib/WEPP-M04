var express = require('express');
var router = express.Router();
const Serie = require("../../../models/Serie.js");

router.delete('/series/:id', async (req, res) => {
    const id = req.params.id;
    let filter = {_id: id}

    try {
        const taula = await Serie.deleteOne(filter);

        if (taula) {
            res.redirect('/series')
        } else {
            res.send({success: false, message: "No s'ha trobat la serie amb el id " + id});
        }
    } catch (e) {
        console.log(e)
        res.send('ERROR' + e.message)
    }
})

module.exports = router;