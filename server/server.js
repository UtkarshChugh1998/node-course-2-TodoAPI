var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose.js');
var {User} = require('./models/user');
var {Todo} = require('./models/todo');

var app = express();
app.use(bodyParser.json());

// Creating new Todo
// Handling the post request to '/todos' route
// Since we have
app.post('/todos',(req,res)=>{
	var todo =new Todo({
		text: req.body.text
	});


	todo.save().then((doc)=>{
		res.send(doc);
	},(e)=>{
		res.status(400).send(e);
	})
});
// Making our web server listen to some port for route requests
// Then forward those requests to the app server to handle them
app.listen(3000, ()=>{
	console.log(' Web Server running on port 3000');
})
