var express = require('express');
var router = express.Router();

router.get('/series/insert', (req, res) => {
    res.render('./views_series/insertar_series', {title: 'Insertar serie | Netflow'})
});


module.exports = router;