var express = require('express');
var router = express.Router();
var Post = require('../../../models/Post');
var crypto = require('crypto'); 
var async = require('async'); 
var passport = require('passport');
var nodemailer = require('nodemailer'); 
var jwt = require('jsonwebtoken');
var multer = require('multer');
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
var postImage = upload.fields([{name:'images'}])


router.get("/", function(req, res){
	Post.find({},{},{sort: '-createdOn'}, function(err, posts){
		if(err){
			response = {"success":false, "message":err};
		}else{
			response = {"success":true, "message":posts};
		} 
		res.json(response); 
	})
})

router.post('/add', postImage, function(req, res){   
	Post.create({
		title: req.body.title,
		body: req.body.body,
		image: req.files && req.files['images'] ? req.files['images'][0]['filename'] : 'none.jpg'
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
	Post.findById(req.params.id, function(err, post){
		if(err){
			response = {"success":false, "message":err};
		}else{
			response = {"success":true, "message":post};
		} 
		res.json(response); 
	})
})


router.put("/:id", postImage, function(req, res){ 

	Post.findById(req.params.id, function(err, post){
		if(err){ 
			res.json({"success":false, "message":err}); 
		}else{ 
			post.title = req.body.title;
			post.body = req.body.body;
			post.image = req.files && req.files['images'] ? req.files['images'][0]['filename'] : req.body.image;

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
	Post.remove({
		_id:req.params.id
	}, function(err, post){
		if(err){ 
			res.json({"success":false, "message":err}); 
		}else{ 
			response = {"success":true, "message":"Post was deleted successfully"};
		}  
        res.json(response); 
	});
})

module.exports = router;
