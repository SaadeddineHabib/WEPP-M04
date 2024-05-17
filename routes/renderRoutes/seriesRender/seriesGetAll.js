var express = require('express');
var router = express.Router();
const Serie = require("../../../models/Serie.js");

router.get('/series', async (req, res) => {
    let filter = {}

    try {
        const result = await Serie.find(filter)
        const options = {
            title: "Series | Netflow",
            series: result,
        }
        res.render('./views_series/series.ejs', options)
    } catch (e) {
        console.log(e)
        res.send('ERROR ' + e.message)
    }
})

module.exports = router;