var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Product = require('../models/Product');
var async = require('async');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'onMarket' });
});

/* GET products page. */
router.get('/products', function(req, res, next) {
	res.render('index', { title: 'onMarket' });
}); 

/* GET orders page. */
router.get('/orders', function(req, res, next) {
	res.render('index', { title: 'onMarket' });
}); 

/* GET customers page. */
router.get('/customers', function(req, res, next) {
	res.render('index', { title: 'onMarket' });
}); 

/* GET settings page. */
router.get('/settings', function(req, res, next) {
	res.render('index', { title: 'onMarket' });
}); 




/* GET store page. */
router.get('/:storeurl', function(req, res, next) {
	User.findOne({"store.url":req.params.storeurl}, function(err, user){
		if(err || !user){
			res.render('index', { title: 'onMarket' });
		}else{
			res.render('themes/'+user.store.theme+'/index', { title: 'onMarket - ' + user.store.name });
		}
	})
});



/* GET product page. */
router.get('/:storeurl/:productid', function(req, res, next) {
	async.waterfall([
		function(callback){
			User.findOne({"store.url":req.params.storeurl}, function(err, user){
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
				Product.findOne({"prodid":req.params.productid, "store.id":user._id }, function(err, product){ 
					if(err || !product){
						var product = null;
					}else{
						var product = product;
					}
					callback(null, user, product);
				})
			}else{
				callback(null, null, null);
			}
		}
	], function(err, user, product){
		if(err){
			// display to error page
		}else{
			// console.log('user', user);
			// console.log('product', product);
			res.render('themes/'+user.store.theme+'/index', { title: 'onMarket - '+product.name, objUser:user, objProduct:product });
		}
	}) 
});



// catch all other routes and pass it to angular app
router.get('*', function(req, res) {   
	res.render('index', { title: 'onMarket' }); 
}); 

module.exports = router;
