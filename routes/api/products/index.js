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
var gm = require('gm').subClass({ imageMagick: true });


var storage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb(null, 'public/uploads/'+req.decoded.user._id+'/products/c/')
	},
	filename: function (req, file, cb) {
		cb(null, new Date().getTime().toString() + '_' + file.fieldname + '-' + file.originalname)
	}
})
var upload = multer({ storage: storage });
var postImage = upload.fields([{name:'nProductImg1', maxCount:1}, {name:'nProductImg2', maxCount:1}, {name:'nProductImg3', maxCount:1}, {name:'nProductImg4', maxCount:1}])


router.get("/", function(req, res){
	Product.find({'store.id':req.decoded.user._id},{},{sort: '-createdOn'}, function(err, posts){
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

		async.forEachOfSeries([strProductImg1, strProductImg2, strProductImg3, strProductImg4], function(value, i, callback){ 
		if(value){
			var imgPath = __dirname + "/../../../public/uploads/"+req.decoded.user._id+"/products/c/"+value;
			var xsthumbPath = __dirname + "/../../../public/uploads/"+req.decoded.user._id+"/products/xs/"+value;
			var smthumbPath = __dirname + "/../../../public/uploads/"+req.decoded.user._id+"/products/sm/"+value;
			var mdthumbPath = __dirname + "/../../../public/uploads/"+req.decoded.user._id+"/products/md/"+value;
	 		
	 		async.series([
	 			function(cb){
	 				gm(imgPath)
						.noProfile()
						.gravity('center')
						.resize('50', '50', "^>")
						.quality(70)
						.crop('50', '50')
						.write(xsthumbPath, function (err) {
							var msg = value + ' : c done';
							if (err){
								msg = err
							}
							cb(null, msg);
						});
	 			},
	 			function(cb){
	 				gm(imgPath)
						.noProfile()
						.gravity('center')
						.resize('50', '50', "^>")
						.quality(70)
						.crop('50', '50')
						.write(xsthumbPath, function (err) {
							var msg = value + ' : xs done';
							if (err){
								msg = err
							}
							cb(null, msg);
						}); 
	 			},
	 			function(cb){
	 				gm(imgPath)
						.noProfile()
						.gravity('center')
						.resize('200', '200', "^>")
						.quality(80)
						.crop('200', '200')
						.write(smthumbPath, function (err) {
							var msg = value + ' : sm done';
							if (err){
								msg = err
							}
							cb(null, msg);
						});
	 			},
	 			function(cb){
	 				gm(imgPath)
						.noProfile()
						.gravity('center')
						.resize('400', '400', "^>")
						.quality(90)
						.crop('400', '400')
						.write(mdthumbPath, function (err) {
							var msg = value + ' : md done';
							if (err){
								msg = err
							}
							cb(null, msg);
						});
	 			}
	 		], function(err, result){
	 			console.log(result)
	 			callback()
	 		}) 
		}else{
			callback()
		}
	}, function(err){
		if(err){
			console.log(err)
		}else{
			console.log('DONE') 
		}
	})   

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
		},
		category: {
			main: req.body.maincat,
			sub: req.body.subcat
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
	console.log(req.params.id)
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

 
	async.forEachOfSeries([strProductImg1, strProductImg2, strProductImg3, strProductImg4], function(value, i, callback){ 
		if(value){
			var imgPath = __dirname + "/../../../public/uploads/"+req.decoded.user._id+"/products/c/"+value;
			var xsthumbPath = __dirname + "/../../../public/uploads/"+req.decoded.user._id+"/products/xs/"+value;
			var smthumbPath = __dirname + "/../../../public/uploads/"+req.decoded.user._id+"/products/sm/"+value;
			var mdthumbPath = __dirname + "/../../../public/uploads/"+req.decoded.user._id+"/products/md/"+value;
	 		
	 		async.series([
	 			function(cb){
	 				gm(imgPath)
						.noProfile()
						.gravity('center')
						.resize('50', '50', "^>")
						.quality(70)
						.crop('50', '50')
						.write(xsthumbPath, function (err) {
							var msg = value + ' : c done';
							if (err){
								msg = err
							}
							cb(null, msg);
						});
	 			},
	 			function(cb){
	 				gm(imgPath)
						.noProfile()
						.gravity('center')
						.resize('50', '50', "^>")
						.quality(70)
						.crop('50', '50')
						.write(xsthumbPath, function (err) {
							var msg = value + ' : xs done';
							if (err){
								msg = err
							}
							cb(null, msg);
						}); 
	 			},
	 			function(cb){
	 				gm(imgPath)
						.noProfile()
						.gravity('center')
						.resize('200', '200', "^>")
						.quality(80)
						.crop('200', '200')
						.write(smthumbPath, function (err) {
							var msg = value + ' : sm done';
							if (err){
								msg = err
							}
							cb(null, msg);
						});
	 			},
	 			function(cb){
	 				gm(imgPath)
						.noProfile()
						.gravity('center')
						.resize('400', '400', "^>")
						.quality(90)
						.crop('400', '400')
						.write(mdthumbPath, function (err) {
							var msg = value + ' : md done';
							if (err){
								msg = err
							}
							cb(null, msg);
						});
	 			}
	 		], function(err, result){
	 			console.log(result)
	 			callback()
	 		}) 
		}
	}, function(err){
		if(err){
			console.log(err)
		}else{
			console.log('DONE') 
		}
	})  

 
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
			post.category = {
				main: req.body.maincat,
				sub: req.body.subcat 
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
