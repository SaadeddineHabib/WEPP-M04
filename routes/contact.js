var express = require('express');
var router = express.Router();


router.get('/contact', (req, res) => {
    const options = {title: 'Contact | Netflow'}
    res.render('contact', options)
})

router.post('/contact/response', (req, res) =>  {
    const body = req.body
    console.log(body)
    const options = {
        title: 'Response contact | Netflow',
        camps: body
    }
    res.render('./contact_response.ejs', options)
})
module.exports = router;