var express = require('express');
var router = express.Router();
var User = require('../models/User');
var Product = require('../models/Product');
var async = require('async');
var _ = require('lodash');
var gm = require('gm').subClass({ imageMagick: true });

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'onMarket' });
});
 
router.get('/manage/*', function(req, res, next) {

	/*
	var imgPath = __dirname + "../../public/uploads/572206b1b3151de41e6b8af4/products/1461847911522_nProductImg1-dribbble_-_shot_-_10.png";
	var thumbPath = __dirname + "../../public/uploads/572206b1b3151de41e6b8af4/thumbs/1461847911522_nProductImg1-dribbble_-_shot_-_10.png";


	gm(imgPath)
		.gravity('center')
		.resize(240, 240)
		.noProfile()
		.write(thumbPath, function (err) {
			if (!err){
				console.log('done');
			} else {
				console.log(err);
				console.log('error');
			}
		}); 
	*/

	/*
	var imgPath = __dirname + "../../public/uploads/572206b1b3151de41e6b8af4/products/1461847911522_nProductImg1-dribbble_-_shot_-_10.png";
	var thumbPath = __dirname + "../../public/uploads/572206b1b3151de41e6b8af4/thumbs/1461847911522_nProductImg1-dribbble_-_shot_-_10.png";


	gm(imgPath)
		.noProfile()
		.gravity('center')
		.thumb('200', '200', thumbPath, 75, function(err){
			if(err){
				console.log(err)
			}else{
				console.log('done')
			}
		})
	*/

	var imgPath = __dirname + "../../public/uploads/572206b1b3151de41e6b8af4/products/10.jpg";
	var thumbPath = __dirname + "../../public/uploads/572206b1b3151de41e6b8af4/thumbs/10.jpg";


	gm(imgPath)
		.noProfile()
		.gravity('center')
		.resize('240', '240', "^>")
		.quality(90)
		.crop('240', '240')
		.write(thumbPath, function (err) {
			if (!err){
				console.log('done');
			} else {
				console.log(err);
				console.log('error');
			}
		});

	res.render('index', { title: 'onMarket' });
});  

router.get('/my/*', function(req, res, next) {
	res.render('index', { title: 'onMarket' });
});  

router.get('/p/*', function(req, res, next) {
	res.render('index', { title: 'onMarket' });
}); 

router.get('/s/*', function(req, res, next) {
	res.render('index', { title: 'onMarket' });
});  

/* GET login page. */
router.get('/login', function(req, res, next) {
	res.render('index', { title: 'onMarket' });
}); 

/* GET login page. */
router.get('/logout', function(req, res, next) {
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
			res.render('index', { title: 'onMarket' }); 
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
		if(err){
			// display to error page
			res.render('index', { title: 'onMarket' }); 
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
