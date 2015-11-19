var mongoose = require('mongoose');
var _ = require('underscore');

var DomoModel;

var setName = function(name) {
	return _.escape(name).trim();
};

var DomoSchema = new mongoose.Schema({
	name: {
		type: String,
		require: true,
		trim: true,
		set: setName
	},
	
	age: {
		type: Number,
		min: 0,
		required: true
	},
	
	favouriteColour: {
		type: String,
		trim: true
	},
	
	owner: {
		type: mongoose.Schema.ObjectId,
		required: true,
		ref: 'Account'
	},
	
	createdData: {
		type: Date,
		default: Date.now
	}
});

DomoSchema.methods.toAPI = function() {
	return {
		name: this.name,
		age: this.age,
		favouriteColour: this.favouriteColour
	};
};

DomoSchema.statics.findByOwner = function(owner, callback) {
	var search = {
		owner: mongoose.Types.ObjectId(owner)
	};
	
	return DomoModel.find(search).select("name age favouriteColour owner").exec(callback);
};

DomoSchema.statics.queryAll = function(callback) {
	return DomoModel.find().select("name age favouriteColour").exec(callback);
}

DomoModel = mongoose.model('Domo', DomoSchema);

module.exports.DomoModel = DomoModel;
module.exports.DomoSchema = DomoSchema;