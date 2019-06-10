// ObjectId is a constuructor function.
// Object Destructor on mongodb to obtain MongoClient property and ObjectId
const {MongoClient, ObjectID} = require('mongodb');
var obj = new ObjectID();
console.log('Object Id-> ',obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db)=>{
	if(err){
		return console.log('Unable to connect to MongoDB Server',err);
	}
	// This is async funciton.
	// db.collection('Todos').insertOne({
	// 	text: 'Walk the dog',
	// 	completed: true
	// }, (err, result)=>{
	// 	if(err){
	// 		return console.log('Ubnable to add Document.');
	// 	}
	// 	console.log(result.ops);
	// });
	// Fetching all Todos documents out of Todos collection
	// find() returns mongoDB cursor
	// This cursor is a pointer to those documents.
	// We can use cursor's methods to get the documents.
	// toArray() means we have array of objects.
	// Now, toArray() works on a promise to return the data.
	// For getting some documents under some condition,
	// Pass the query in find()
	db.collection('Todos').find({completed: false}).toArray().then((ops)=>{
		console.log('TODOS');
		console.log(JSON.stringify(ops, undefined, 2));
	},(err)=>{
		console.log('Unable to fetch TODOs',err);
	})
	// Querying Todos by ID
	// cannot compare Object Id of a document with the Object id 
	// in string Data type. So, we convert the String to Object ID type
	db.collection('Todos')
	.find({
		_id:new ObjectID('5cfe67bb729aac21544cd46e')
	}).toArray()
	.then((result)=>{
		console.log('Todos 1');
		console.log(JSON.stringify(result, undefined, 2));
	},(err)=>{
		console.log('Unable to find document',err);
	});
	
	// db.close() interferes with the code abobe
	// db.close();
});