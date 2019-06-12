
// Requiring mongoose variable which points to TodoApp DataBase
var {mongoose} = require('../db/mongoose.js');
// In mongoDB, we can have different documents with
// different fields/properties inside the same collection.
// To make things more organised, we create a model for
// everything we want to store.(which is the basic framework of
// for every document.
// The newly created object may or may not have these properties
// depending on how it is defined.
// However if defined, it should follow all the features,
// defined for it in the model.
// First argument is the name of model.
// The collection name using that model will be todos 
// Second arg is an object which defines various properties
// for the model.
// We define a text property/field and define it equal to a
// object which defines what text is.

var Todo = mongoose.model('Todo',{
	text: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
	},
	completed:{
		type: Boolean,
		default: false
	},
	completedAt:{
		type: Number,
		default: null
	}
});

module.exports = {
	Todo
}
