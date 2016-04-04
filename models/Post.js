var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

var Post = new Schema({
	title: String,
	body: String, 
	createdOn: {type: Date, default: Date.now()}
});
 
module.exports = mongoose.model('Post', Post);