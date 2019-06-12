const {app} = require('./../server.js');
const {Todo} = require('./../models/todo.js');
const request = require('supertest');
const expect = require('expect');

// Testing life cycle method which runs before every single
// test function.
beforeEach((done)=>{
	// Will move on to testing the test case once we call done.
	// Todo.remove({}), will remove all the existing Todos.
	Todo.deleteMany({}).then(()=> done());
});

// Testing the /todos POST route using mocha
describe('POST /todos',()=>{
	it('should create new todo',(done)=>{
	var text = 'Test todo text';
	// Testing using supertest
	request(app)
	.post('/todos')
	// Sending data along with the request which gets
	// converted to json implicilty by supertest library.
	.send({text})
	// Making assertions using supertest expect()
	.expect(200)
	// Custom assertion using expect library
	// res: HTTP response object
	.expect((res)=>{
		expect(res.body.text).toBe(text);
	})
	// Call end() to wrap up the assertions.
	// Calling end and check what is stored in MongoDB model
	.end((err, res)=>{
		if(err){
			return done(err);
		}
		// Here if one of the expect () fails the 
		// test may pass.
		// Todo.find() similar to Mongodb native find()
		// it returns all the todos. 
		Todo.find().then((todos)=>{
			expect(todos.length).toBe(1);
			expect(todos[0].text).toBe(text);
			done();
		// Catching error if Todos.find() gives error
		}).catch((e)=>{
			done(e);
		});
	});
	});

	// Testing bad request.
	it('should not create todo with invalid body data',(done)=>{
	// Making POST request to '/todos/ route' in app server 
	var text = '';
	request(app)
	.post('/todos')
	.send({text})
	.expect(400)
	.end((err, res)=>{
		if(err){
			return done(err);
		}
		Todo.find().then((results)=>{
			expect(results.length).toBe(0);
			done();
		}).catch((e)=>{
			done(e);
		})
	})

})	
})
