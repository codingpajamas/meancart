var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Product = require('../models/Product');
var async = require('async');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'onMarket' });
});



/* GET manage page. */
router.get('/manage', function(req, res, next) {
	res.render('index', { title: 'onMarket' });
});



/* GET store page. */
router.get('/:storeid', function(req, res, next) {
	User.findOne({"store.url":req.params.storeid}, function(err, user){
		if(err || !user){
			res.render('index', { title: 'onMarket' });
		}else{
			res.render('themes/'+user.store.theme+'/index', { title: 'onMarket - ' + user.store.name });
		}
	})
});



/* GET product page. */
router.get('/:storeid/:productid', function(req, res, next) {
	async.waterfall([
		function(callback){
			User.findOne({"store.url":req.params.storeid}, function(err, user){
				if(err || !user){
					var user = null;
				}else{
					var user = user;
				}
				callback(null, user);
			})
		},
		function(user, callback){
			if(user != null){
				Product.findOne({"_id":req.params.productid, "store.id":user._id }, function(err, user){
					if(err || !user){
						var user = null;
					}else{
						var user = user;
					}
					callback(null, user);
				})
			}else{
				callback(null, null, null);
			}
		}
	], function(err, user, product){
		if(err){
			// display to error page
		}else{
			console.log('user', user);
			console.log('product', product);
		}
	})


	User.findOne({"store.url":req.params.storeid}, function(err, user){
		if(err || !user){
			res.render('index', { title: 'onMarket' });
		}else{
			res.render('themes/'+user.store.theme+'/index', { title: 'onMarket - product' });
		}
	})
});



// catch all other routes and pass it to angular app
router.get('*', function(req, res) {  
	/*
	var fullUrlPath = req.originalUrl.replace(/^\/|\/$/g, '');
	var pageUrlPath = fullUrlPath.split("/")[0]; 

	User.findOne({"store.url":pageUrlPath}, function(err, user){
		if(err || !user){
			res.render('index', { title: 'onMarket' });
		}else{
			res.render('themes/'+user.store.theme+'/index', { title: 'onMarket' });
		}
	});
	*/

	res.render('index', { title: 'onMarket' }); 
}); 

module.exports = router;
