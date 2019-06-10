// ObjectId is a constuructor function.
// Object Destructor on mongodb to obtain MongoClient property and ObjectId
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db)=>{
	if(err){
		return console.log('Unable to connect to MongoDB Server',err);
	}
	db.collection('Todos').findOneAndDelete({_id: new ObjectID('5cfea4cb5bd90117d2f598fe')}).then((res)=>{
		console.log(res);
	});
	db.collection('Todos').deleteMany({text:'Something to do'}).then((res)=>{
		if(res.result.ok !== 1)
		{
			return console.log('Unable to delete');
		}
		console.log('Success,',res.result.n,'documents deleted');
	});
});