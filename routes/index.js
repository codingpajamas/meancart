var express = require('express');
var router = express.Router();
var User = require('../models/User');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'onMarket' });
});

// catch all other routes and pass it to angular app
router.get('*', function(req, res) {  

	var fullUrlPath = req.originalUrl.replace(/^\/|\/$/g, '');
	var pageUrlPath = fullUrlPath.split("/")[0]; 

	User.findOne({"store.url":pageUrlPath}, function(err, user){
		if(err || !user){
			res.render('index', { title: 'onMarket' });
		}else{
			console.log(user)
			res.render('themes/'+user.store.theme+'/index', { title: 'onMarket' });
		}
	})

}); 

module.exports = router;
