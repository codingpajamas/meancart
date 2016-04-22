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
		cb(null, 'public/uploads/'+req.decoded.user._id+'/products/')
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

	// this needs refactoring!!!!
	var strProductImg1 = null
	var strProductImg2 = null
	var strProductImg3 = null
	var strProductImg4 = null

	// let's add image1  
	if(req.files && req.files['nProductImg1'] && req.files['nProductImg1'][0] && req.files['nProductImg1'][0]['size']){
		strProductImg1 = req.files['nProductImg1'][0]['filename']; 
	}  

	// let's add image2  
	if(req.files && req.files['nProductImg2'] && req.files['nProductImg2'][0] && req.files['nProductImg2'][0]['size']){
		strProductImg2 = req.files['nProductImg2'][0]['filename']; 
	}  

	// let's add image3  
	if(req.files && req.files['nProductImg3'] && req.files['nProductImg3'][0] && req.files['nProductImg3'][0]['size']){
		strProductImg3 = req.files['nProductImg3'][0]['filename'];
	}  

	// let's add image4  
	if(req.files && req.files['nProductImg4'] && req.files['nProductImg4'][0] && req.files['nProductImg4'][0]['size']){
		strProductImg4 = req.files['nProductImg4'][0]['filename'];
	}  

	Product.create({
		name: req.body.name,
		desc: req.body.desc,
		price: req.body.price,
		image: req.files && req.files['images'] ? req.files['images'][0]['filename'] : 'none.jpg',
		images: {
			img1: strProductImg1,
			img2: strProductImg2,
			img3: strProductImg3,
			img4: strProductImg4
		},
		store: {
			id: req.decoded.user._id,
			name: req.decoded.user.store['name'],
			url: req.decoded.user.store['url']
		}
	}, function(err, product){ 
		if(err){
			response = {"success":false, "message":err};
		}else{
			var prettyUrlRaw = req.body.name.trim()
				.replace(/ñ/g, 'n')
				.replace(/'/g, '')
				.replace(/"/g, '')
				.replace(/[^a-zA-Z0-9]/g,"")
				.toLowerCase()
				.replace(/--/g, '');

			Product.find({"urlraw":prettyUrlRaw, "_id": {$ne:product._id}}, {}, {sort: 'createdOn'}, function(err, products){
				var strPrettyUrl = prettyUrlRaw
				
				if(products.length > 0){
					strPrettyUrl = prettyUrlRaw + "-" + products.length;
				}
 
				product.url = strPrettyUrl;
				product.urlraw = prettyUrlRaw;
				product.save(function(err){
					if(err){
						console.log('unable to update store name', err)
					}
				})
				
			});

			response = {"success":true, "message":product};
		} 
		res.json(response); 
	}); 
}); 

router.get("/:id", function(req, res){ 
	Product.findById(req.params.id, function(err, product){
		if(err){
			response = {"success":false, "message":err};
		}else{
			response = {"success":true, "message":product};
		} 
		res.json(response); 
	})
})


router.put("/:id", postImage, function(req, res){  

	// this needs refactoring!!!!
	var productImages = []; 
	var imgs = [];

	var strProductImg1 = null
	var strProductImg2 = null
	var strProductImg3 = null
	var strProductImg4 = null

	// let's add image1  
	if(req.files && req.files['nProductImg1'] && req.files['nProductImg1'][0] && req.files['nProductImg1'][0]['size']){ 
		strProductImg1 = req.files['nProductImg1'][0]['filename']; 		 
	} 
	if(!strProductImg1 && req.body.productImg1 != 'undefined'){   
		strProductImg1 = req.body.productImg1;
	}

	// let's add image2  
	if(req.files && req.files['nProductImg2'] && req.files['nProductImg2'][0] && req.files['nProductImg2'][0]['size']){ 
		strProductImg2 = req.files['nProductImg2'][0]['filename'];; 		
	} 
	if(!strProductImg2 && req.body.productImg2 != 'undefined'){ 
		strProductImg2 = req.body.productImg2;
	}

	// let's add image3  
	if(req.files && req.files['nProductImg3'] && req.files['nProductImg3'][0] && req.files['nProductImg3'][0]['size']){ 
		strProductImg3 = req.files['nProductImg3'][0]['filename']; 		
	} 
	if(!strProductImg3 && req.body.productImg3 != 'undefined'){  
		strProductImg3 = req.body.productImg;
	}

	// let's add image4  
	if(req.files && req.files['nProductImg4'] && req.files['nProductImg4'][0] && req.files['nProductImg4'][0]['size']){ 
		strProductImg4 = req.files['nProductImg4'][0]['filename']; 		
	} 
	if(!strProductImg4 && req.body.productImg4 != 'undefined'){  
		strProductImg4 = req.body.productImg;
	} 

	console.log(strProductImg1)
console.log(strProductImg2)
console.log(strProductImg3)
console.log(strProductImg4)
 
	Product.findById(req.params.id, function(err, post){
		if(err){ 
			res.json({"success":false, "message":err}); 
		}else{ 
			post.name = req.body.name;
			post.desc = req.body.desc;
			post.price = req.body.price;   
			post.images = {
				img1: strProductImg1,
				img2: strProductImg2,
				img3: strProductImg3,
				img4: strProductImg4
			};
 
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
