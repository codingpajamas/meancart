var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'MEANjs Boilerplate' });
});

// catch all other routes and pass it to angular app
router.get('*', function(req, res) {
	res.render('index', { title: 'MEANjs Boilerplate' });
});

module.exports = router;
