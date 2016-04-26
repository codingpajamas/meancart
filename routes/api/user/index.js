var express = require('express');
var router = express.Router();
var User = require('../../../models/User');
var crypto = require('crypto'); 
var async = require('async'); 
var passport = require('passport');
var nodemailer = require('nodemailer'); 
var jwt = require('jsonwebtoken');
var secretmonster = 'meanstartedhahahaha';
var User = require('../../../models/User');  

router.get('/me', function(req, res){  
	res.json(req.decoded) 
}); 

router.get('/refresh', function(req, res){  
	User.findById(req.decoded.user._id, function(err, userObj){  
		if(err){
			res.json({'status':'error'})
		}else{
			// setup the token 
			var usertoken = jwt.sign({
				user : userObj
			}, secretmonster, {
				expiresIn : 86400
			});

			res.json({'status':'success', 'message' : 'Successfully logged in.', token:usertoken})
		}
	})
}); 

module.exports = router;
