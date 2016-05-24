var express = require('express');
var router = express.Router(); 
var User = require('../../models/User');
var Product = require('../../models/Product');
var Cart = require('../../models/Cart');
var async = require('async'); 
var _ = require('lodash');

router.get("/", function(req, res){  
	async.waterfall([
		function(callback){
			Cart.find({"userid":req.decoded.user._id},{},{sort:"-createdOn"}, function(err, objCartsRaw){
				if(err || !objCartsRaw || !objCartsRaw.length){
					callback(new Error("No item in cart"));
				}else{
					callback(null, objCartsRaw);
				}  
			})  
		},
		function(objCartsRaw, callback){
			var objProductIds = _.map(objCartsRaw, 'productid'); 

			Product.find({_id: { $in:objProductIds }}, {'desc':false, "wishlistedBy":false, "tags":false, "category":false, "related":false}, {}, function(err, objProductsRaw){
				if(err || !objProductsRaw || !objProductsRaw.length){
					callback(new Error("No products found"));
				}else{  
					callback(null, objProductsRaw, objCartsRaw)
				}   
			})

		}
	], function(err, objProductsRaw, objCartsRaw){
		if(err){
			response = {"success":false, "message":err};
		}else{ 
			var objResult = {"prods":objProductsRaw, "carts":objCartsRaw}
			response = {"success":true, "message":objResult};
		} 
		res.json(response); 
	}) 
})
 
router.post("/", function(req, res){ 
	Cart.create({
		userid: req.decoded.user._id,
		productid: req.body.productId,
		quantity: req.body.quantity,
		status: 'new'
	}, function(err, cart){
		if(err){
			response = {"success":false, "message":err};
		}else{
			response = {"success":true, "message":cart};
		} 
		res.json(response); 
	})
})

router.get("/:cartid", function(req, res){ 
	res.json({"success":true, "message":"get one cart"});
})

router.put("/:cartid", function(req, res){ 
	res.json({"success":true, "message":"update cart"});
})

router.delete("/:cartid", function(req, res){ 
	res.json({"success":true, "message":"delete one cart"});
})





module.exports = router;
