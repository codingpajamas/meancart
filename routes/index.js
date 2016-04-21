var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Product = require('../models/Product');
var async = require('async');
var _ = require('lodash');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'onMarket' });
});

/* GET products page. */
router.get('/products', function(req, res, next) {
	res.render('index', { title: 'onMarket' });
});  
router.get('/products/*', function(req, res, next) {
	res.render('index', { title: 'onMarket' });
}); 

/* GET orders page. */
router.get('/orders', function(req, res, next) {
	res.render('index', { title: 'onMarket' });
}); 
router.get('/orders/*', function(req, res, next) {
	res.render('index', { title: 'onMarket' });
}); 

/* GET customers page. */
router.get('/customers', function(req, res, next) {
	res.render('index', { title: 'onMarket' });
}); 
router.get('/customers/*', function(req, res, next) {
	res.render('index', { title: 'onMarket' });
}); 

/* GET settings page. */
router.get('/settings', function(req, res, next) {
	res.render('index', { title: 'onMarket' });
}); 
router.get('/settings/*', function(req, res, next) {
	res.render('index', { title: 'onMarket' });
}); 

/* GET login page. */
router.get('/login', function(req, res, next) {
	res.render('index', { title: 'onMarket' });
}); 

/* GET register page. */
router.get('/register', function(req, res, next) {
	res.render('index', { title: 'onMarket' });
}); 
 
/* GET store page. */
router.get('/:storeurl', function(req, res, next) { 
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
				Product.find({"store.id":user._id }, function(err, products){ 
					if(err || !products){
						var products = null;
					}else{
						var products = products;
					}
					callback(null, user, products);
				})
			}else{
				callback(null, null, null);
			}
		}
	], function(err, user, products){ 
		if(err){
			// display to error page
		}else{  
			var strTitle = user && user.store.name ? 'onMarket - '+user.store.name : "Store Not Found"; 
			res.render('themes/'+user.store.theme+'/index', { title: strTitle, objUser:user, objProducts:products });
		}
	}) 
});
 
/* GET product page. */
router.get('/:storeurl/:producturl', function(req, res, next) {
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
				Product.findOne({"url":req.params.producturl, "store.id":user._id }, function(err, product){ 
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
		console.log('user', user)
		console.log('product', product)
		if(err){
			// display to error page
		}else{ 
			var strTitle = product && product.name ? 'onMarket - '+product.name : "Product Not Found";   
			res.render('themes/'+user.store.theme+'/product', { title: strTitle, objUser:user, objProduct:product });
		}
	}) 
});
 
// catch all other routes and pass it to angular app
router.get('*', function(req, res) {   
	res.render('index', { title: 'onMarket' }); 
}); 

module.exports = router;
