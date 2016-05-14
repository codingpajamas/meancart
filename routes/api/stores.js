var express = require('express');
var router = express.Router();
var mkdirp = require('mkdirp');
var User = require('../../models/User');

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
 

module.exports = router;
