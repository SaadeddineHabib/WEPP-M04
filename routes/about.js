var express = require('express');
var router = express.Router();


router.get('/about', (req, res) => {
    const options = {title: 'Author | Netflow'}
    res.render('about.ejs', options)
})
module.exports = router;