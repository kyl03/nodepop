var express = require('express');
var router = express.Router();
const Ad = require('../models/Ad');

/* GET home page. */
router.get('/', function (req, res, next) {
    Ad.find({}, function (err, ads) {
        if (err) {
            console.log(err);
        } else {
            res.render('index', { ads });
        }
    })
});


module.exports = router;
