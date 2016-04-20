var mongoose = require('mongoose');
var Schema = mongoose.Schema; 
var shortId = require('shortid');

var Product = new Schema({
	prodid: {type: String, unique: true, default: shortId.generate},
	url: String,
	urlraw: String,
	name: String,
	desc: String, 
	price: Number,  
	images: { 
		productImg1: String,
		productImg2: String,
		productImg3: String,
		productImg4: String
	},
	store: {
		id: String,
		name: String,
		url: String
	},
	createdOn: {type: Date, default: Date.now()}
});
 
module.exports = mongoose.model('Product', Product);