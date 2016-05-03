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
	images: Array,
	store: {
		id: String,
		name: String,
		url: String
	},
	category: {
		main: String,
		sub: String
	},
	createdOn: {type: Date, default: Date.now()}
});
 
module.exports = mongoose.model('Product', Product);