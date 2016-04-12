var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

var Product = new Schema({
	name: String,
	desc: String, 
	price: Number, 
	image:String,
	createdOn: {type: Date, default: Date.now()}
});
 
module.exports = mongoose.model('Product', Product);