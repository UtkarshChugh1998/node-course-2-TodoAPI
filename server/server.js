var express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose.js');
const {User} = require('./models/user');
const {Todo} = require('./models/todo');
const {ObjectID} = require('mongodb');
var app = express();
var port = process.env.PORT || 3000;
// Content passed along with HTTP request in body property
// is parsed to JSOn so that it can be read by the server.
app.use(bodyParser.json());

// Creating new Todo
// Handling the post request to '/todos' route
// Since we have

app.post('/todos',(req,res)=>{
	// If an object failing the properties' conditions is defined
	// then new Todo() will not throw an error but, .save() will throw 
	// one
	var todo = new Todo({
		text: req.body.text
	});

	todo.save().then((doc)=>{
		res.send(doc);
	},(e)=>{
		res.status(400).send(e);
	})
});

// Reading all resourses(TOdos)
app.get('/todos',(req, res)=>{
	Todo.find().then((todos)=>{
		// While passing an array, we cannot pass
		// other res properties like custom code
		// Better method is to pass an array
		// with todos array inside as key value pair
		res.send({todos,
			code: 'asas'});
	}).catch((e)=>
	{
		res.status(400).send(e);
	})
})

// GET /todos/:id
app.get('/todos/:id',(req, res)=>{
	// Check for valid ID
	// If not valid stop function execution and 
	// respond with 400 and send empty body.
	// If valid send success.
	var {id} = req.params;
	if(!ObjectID.isValid(id))
	{
		return res.status(404).send();
	}
	// Our REST API should respond only in JSON format
	Todo.findById(id).then((todo)=>{
			if(!todo){
				return res.status(404).send();
			}
			res.send({todo});
		}).catch((e)=>{
			res.send(400).send();
		})	
		
})

// Making our web server listen to some port for route requests
// Then forward those requests to the app server to handle them
app.listen(port, ()=>{
	console.log(' Web Server running on port',port);
})

module.exports = {
	app
}
