var express = require('express');
var router = express.Router();
var Post = require('../../../models/Post');
var crypto = require('crypto'); 
var async = require('async'); 
var passport = require('passport');
var nodemailer = require('nodemailer'); 
var jwt = require('jsonwebtoken');
var secretmonster = 'meanstartedhahahaha';

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

router.post('/add', function(req, res){   
	Post.create({
		title: req.body.title,
		body: req.body.body
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
	console.log(req.param.id)
	Post.findById(req.param.id, function(err, post){
		if(err){
			response = {"success":false, "message":err};
		}else{
			response = {"success":true, "message":post};
		} 
		res.json(response); 
	})
})

module.exports = router;
