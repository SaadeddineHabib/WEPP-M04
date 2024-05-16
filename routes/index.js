var express = require('express');
var router = express.Router();


router.get('/', function (req, res) {
    const options = {title: 'Home | Netflow'}
    res.render('index', options);
});

module.exports = router;