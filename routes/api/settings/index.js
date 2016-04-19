var express = require('express');
var router = express.Router();
var User = require('../../../models/User');  
 


router.get("/", function(req, res){
	User.findById(req.decoded.user._id, function(err, user){
		if(err){ 
			res.json({"success":false, "message":err}); 
		}else{ 
			response = {"success":true, "message":user.store}; 
		}  

		res.json(response);
	});
})

router.post("/", function(req, res){   
	User.findById(req.decoded.user._id, function(err, user){
		if(err){ 
			res.json({"success":false, "message":err}); 
		}else{ 
			user.store.name = req.body.name;
			user.store.description = req.body.description;
			user.store.theme = req.body.theme;
 
			user.save(function(err) {
                if(err){
                	response = {"success":true, "message":err}; 
                }else{
                	response = {"success":true, "message":user.store};
                } 
                res.json(response); 
            });
		}  
	});
});  

module.exports = router;
