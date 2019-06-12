// Requiring mongoose object which points to TodoApp DataBase
var {mongoose} = require('../db/mongoose.js');
// Create new User model.
// email -require, trim,type:string

var User = mongoose.model('User',{
	email: {
		type: String,
		required: true,
		minlength: 1,
		trim: true
	}
});

module.exports = {
	User
}
