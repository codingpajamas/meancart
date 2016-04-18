var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

var Product = new Schema({
	name: String,
	desc: String, 
	price: Number, 
	image:String,
	images: { 
		productImg1: String,
		productImg2: String,
		productImg3: String,
		productImg4: String
	},
	createdOn: {type: Date, default: Date.now()}
});
 
module.exports = mongoose.model('Product', Product);