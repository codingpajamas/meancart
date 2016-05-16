var express = require('express');
var router = express.Router();
var mkdirp = require('mkdirp');
var User = require('../../models/User');
var Product = require('../../models/Product');

router.get("/url/:storeUrl", function(req, res){ 
	User.findOne(
		{'store.url':req.params.storeUrl},
		{'username':false, 'profile':false, 'createdOn':false, 'hash':false, 'salt':false},
		{}, 
		function(err, user){ 
			if(err){ 
				res.json({"success":false, "message":err}); 
			}else{ 
				response = {"success":true, "message":user}; 
			}  

			res.json(response);
		}
	);
})
 

router.get("/:storeId/products", function(req, res){ 
	Product.find({'store.id':req.params.storeId},{},{sort: '-createdOn'}, function(err, products){
		if(err){
			response = {"success":false, "message":err};
		}else{
			response = {"success":true, "message":products};
		} 
		res.json(response); 
	})
})

router.get("/getbyproductid/:productid", function(req, res){ 
	console.log(req.params.productid)
	User.findOne(
		{'_id':req.params.productid},
		{'username':false, 'profile':false, 'createdOn':false, 'hash':false, 'salt':false},
		{}, 
		function(err, user){ 
			if(err){ 
				res.json({"success":false, "message":err}); 
			}else{ 
				response = {"success":true, "message":user}; 
			}  

			res.json(response);
		}
	);
})

module.exports = router;
