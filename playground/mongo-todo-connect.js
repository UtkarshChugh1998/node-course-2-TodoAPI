// Pulling out mongo Client for connecting and iteracting with DB
const MongoClient = require('mongodb').MongoClient;
// Mongo Client Lets us connect to mongo server
// and issue commands to manipulate DB.

// Connecting to DB server and then to the required db
// from DBs provided by the server or creating a new one.
// first argument is the url where DB lives.
// Second argument is callback function, which will 
// be responded to by the async connect() if the connection
// is successful or failed.
// If DB already exists it will connect to that server,
// If not, then create a new DB.
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db)=>{
	if(err){
		console.log('Failed to connect to MongoDB server');
		return;
	}
	console.log('Connected to MongoDB server');
	// Inserting new Record to DB todoApp
	// We will have 2 collections: todos, users

	// Adding data to todos collection
	// db.collection('Todos').insertOne({
	// 	text: 'Something to do',
	// 	completed:false
	// 	}, (err, result)=>{
	// 	if(err){
	// 		return console.log('Unable to insert the document',err);
	// 	}
	// 	console.log(JSON.stringify(result.ops, undefined, 2));
	// });

	// Insert new document into users collection (name,age, location)
	//db.collction() is used to refer to collection provided in the argument.
	// If collection doesnt exist, a new collection is created having the
	// name specified and then refer to it.
	db.collection('Users').insertOne({
		name: 'Kartik',
		age: 21,
		location: 'Jalandhar'
	},(err, result)=>{
		if(err)
		{
			return console.log('Unable to insert the document ',err);
		}
		// Printing all the newly inserted docs using result.ops
		console.log(JSON.stringify(result.ops, undefined, 2));
	});
	
	// To close connection with mongo Server.
	db.close();
});
