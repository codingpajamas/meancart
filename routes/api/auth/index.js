var express = require('express');
var router = express.Router();
var User = require('../../../models/User');
var crypto = require('crypto'); 
var async = require('async'); 
var passport = require('passport');
var nodemailer = require('nodemailer'); 

router.post('/register', function(req, res){
  	
	User.findOne(
		{username : req.body.username},
		function(err, user){
			if(err){
				res.json({"status":"error", "message":"Email is already used."})
			}else{
				User.register( new User({ username:req.body.username, fullname:req.body.fullname }), req.body.password, function(err, user){
					if(err){
						res.json({"status":"error", "message": err.message});
					}else{
						res.json({'status':'success','message':'Registration is successful.'});
					}
				});
			}
		}
	)

});

router.post('/login', function(req, res, next){
	passport.authenticate('local', function(err, user, info){  
		if(err || !user){ 
			res.json({'status':'error', 'message' : info.message})
		} else { 
			res.json({'status':'success', 'message' : 'Successfully logged in.'})
		};
	})(req, res, next);
})

module.exports = router;
