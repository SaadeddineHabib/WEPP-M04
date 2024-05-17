const express = require('express');
const router = express.Router();
const Serie = require("../../../models/Serie.js");

router.get('/api/series', async (req, res) => {
    let filter = {}
    try {
        const  series = await Serie.find(filter)
        return res.send(series)
    } catch (e) {
        console.log(e)
        res.send('ERROR ' + e.message)
    }
})

module.exports = router;