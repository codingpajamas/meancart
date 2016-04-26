var express = require('express');
var router = express.Router();
var mkdirp = require('mkdirp');
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
	User.findById(req.decoded.user._id, function(err, userObj){
		if(err){ 
			res.json({"success":false, "message":err}); 
		}else{ 
 			
 			if(userObj.store){
				var prettyUrlRaw = req.body.name.trim()
					.replace(/ñ/g, 'n')
					.replace(/'/g, '')
					.replace(/"/g, '')
					.replace(/[^a-zA-Z0-9]/g,"")
					.toLowerCase()
					.replace(/--/g, '');
	 
				User.find({"store.urlraw":prettyUrlRaw, "username": {$ne:userObj.username}}, {}, {sort: 'createdOn'}, function(err, users){
					var strPrettyUrl = prettyUrlRaw
					
					if(users.length > 0){
						strPrettyUrl = prettyUrlRaw + "." + users.length;
					}
	 
					userObj.store.url = strPrettyUrl;
					userObj.store.urlraw = prettyUrlRaw;
					userObj.store.name = req.body.name;
					userObj.store.description = req.body.description;
					userObj.store.theme = req.body.theme;
					userObj.save(function(err){
						if(err){
							console.log('unable to update store name', err)
							res.json({"success":false, "message":err}); 
						}else{
							// update req.decoded
							console.log(req.decoded.user)
							console.log(userObj.store)
							req.decoded.user.store = userObj.store 
							console.log(req.decoded.user)
							res.json({"success":true, "message":userObj.store}); 
						}
					}); 
					
				})
			}else{
				userObj.store.name = req.body.name;
				userObj.store.description = req.body.description;
				userObj.store.theme = req.body.theme;
				userObj.save(function(err){
					if(err){
						console.log('unable to update store name', err)
						res.json({"success":false, "message":err}); 
					}else{
						res.json({"success":true, "message":userObj.store}); 
					}
				}); 
			} 
		}  
	});
});  

module.exports = router;
