var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var orderSchema = new Schema({
	user_id			: String,
	products_id		: String,
	price       	: Number,
	table       	: String,
	additional_info : String,
	status 			: String,
	created_at  	: Date,
  	updated_at  	: Date
});

orderSchema.pre('save', function(next) {
  // get the current date
  var currentDate = new Date();
  
  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

	//sum the products price
	////////////////////////
  next();
});