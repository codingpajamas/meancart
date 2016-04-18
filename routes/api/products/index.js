var express = require('express');
var router = express.Router();
var Product = require('../../../models/Product');
var crypto = require('crypto'); 
var async = require('async'); 
var passport = require('passport');
var nodemailer = require('nodemailer'); 
var jwt = require('jsonwebtoken');
var multer = require('multer');
var _ = require('lodash');
var secretmonster = 'meanstartedhahahaha';


var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'public/uploads/')
	},
	filename: function (req, file, cb) {
		cb(null, new Date().getTime().toString() + '_' + file.fieldname + '-' + file.originalname)
	}
})
var upload = multer({ storage: storage });
var postImage = upload.fields([{name:'nProductImg1', maxCount:1}, {name:'nProductImg2', maxCount:1}, {name:'nProductImg3', maxCount:1}, {name:'nProductImg4', maxCount:1}])


router.get("/", function(req, res){
	Product.find({},{},{sort: '-createdOn'}, function(err, posts){
		if(err){
			response = {"success":false, "message":err};
		}else{
			response = {"success":true, "message":posts};
		} 
		res.json(response); 
	})
})

router.post('/add', postImage, function(req, res){   
	console.log(req.body)
	Product.create({
		name: req.body.name,
		desc: req.body.desc,
		price: req.body.price,
		image: req.files && req.files['images'] ? req.files['images'][0]['filename'] : 'none.jpg',
		images: {productImg1:"", productImg2:"", productImg3:"", productImg4:""}
	}, function(err, post){ 
		if(err){
			response = {"success":false, "message":err};
		}else{
			response = {"success":true, "message":post};
		} 
		res.json(response); 
	}); 
}); 

router.get("/:id", function(req, res){ 
	Product.findById(req.params.id, function(err, post){
		if(err){
			response = {"success":false, "message":err};
		}else{
			response = {"success":true, "message":post};
		} 
		res.json(response); 
	})
})


router.put("/:id", postImage, function(req, res){  

	// this needs refactoring!!!!
	var productImages = []; 

	// let's add image1  
	if(req.files && req.files['nProductImg1'] && req.files['nProductImg1'][0] && req.files['nProductImg1'][0]['size']){
		productImages['productImg1'] = req.files['nProductImg1'][0]['filename']; 
	} 
	if(!productImages['productImg1'] && req.body.productImg1 != 'undefined'){  
		productImages['productImg1'] = req.body.productImg1;
	}

	// let's add image2  
	if(req.files && req.files['nProductImg2'] && req.files['nProductImg2'][0] && req.files['nProductImg2'][0]['size']){
		productImages['productImg2'] = req.files['nProductImg2'][0]['filename']; 
	} 
	if(!productImages['productImg2'] && req.body.productImg2 != 'undefined'){ 
		productImages['productImg2'] = req.body.productImg2;
	}

	// let's add image3  
	if(req.files && req.files['nProductImg3'] && req.files['nProductImg3'][0] && req.files['nProductImg3'][0]['size']){
		productImages['productImg3'] = req.files['nProductImg3'][0]['filename'];
	} 
	if(!productImages['productImg3'] && req.body.productImg3 != 'undefined'){ 
		productImages['productImg3'] = req.body.productImg3;
	}

	// let's add image4  
	if(req.files && req.files['nProductImg4'] && req.files['nProductImg4'][0] && req.files['nProductImg4'][0]['size']){
		productImages['productImg4'] = req.files['nProductImg4'][0]['filename'];
	} 
	if(!productImages['productImg4'] && req.body.productImg4 != 'undefined'){ 
		productImages['productImg4'] = req.body.productImg4;
	} 

 
	Product.findById(req.params.id, function(err, post){
		if(err){ 
			res.json({"success":false, "message":err}); 
		}else{ 
			post.name = req.body.name;
			post.desc = req.body.desc;
			post.price = req.body.price; 
			post.images.productImg1 = productImages['productImg1'] ? productImages['productImg1'] : ""; 
			post.images.productImg2 = productImages['productImg2'] ? productImages['productImg2'] : ""; 
			post.images.productImg3 = productImages['productImg3'] ? productImages['productImg3'] : ""; 
			post.images.productImg4 = productImages['productImg4'] ? productImages['productImg4'] : ""; 
 
			post.save(function(err) {
                if(err){
                	response = {"success":true, "message":err}; 
                }else{
                	response = {"success":true, "message":post};
                } 
                res.json(response); 
            });
		}  
	})
})


router.delete("/:id", function(req, res){ 
	Product.remove({
		_id:req.params.id
	}, function(err, post){
		if(err){ 
			res.json({"success":false, "message":err}); 
		}else{ 
			response = {"success":true, "message":"Product was deleted successfully"};
		}  
        res.json(response); 
	});
})

module.exports = router;
