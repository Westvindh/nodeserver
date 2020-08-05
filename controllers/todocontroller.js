var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//mongoose.connect('mongodb+srv://Arjun:arjun@cluster0.j2wc3.mongodb.net/<dbname>?retryWrites=true&w=majority');
mongoose.connect('mongodb+srv://Arjun:arjun@cluster0.j2wc3.mongodb.net/todos?retryWrites=true&w=majority');

var todoschema = new mongoose.Schema({
	item: String
});

var Todo = mongoose.model('Todo', todoschema);
/*var itemone = Todo({item: 'buy flower'}).save(function(err){
	if(err)
	{
		throw err;
	}

	console.log('saved');
});*/


var urlencodedParser = bodyParser.urlencoded({ extended: false });

//var data = [{item: 'task1'}, {item: 'task2'}, {item: 'task3'}];

module.exports = function(app)
{
	app.get('/todo', function(req, res)
	{
		Todo.find({}, function(err, data)
		{
			if(err)
			{
				throw err;
			}
			res.render('todopage', {todos: data});
			//res.send({todos: data});
		});
	});

	app.post('/todo', urlencodedParser, function(req, res)
	{
		var netodo = Todo(req.body).save(function(err, data){
			if(err)
			{
				throw err;
			}
			
			//res.json(data);
			Todo.find({}, function(err, data)
		{
			if(err)
			{
				throw err;
			}
			res.render('todopage', {todos: data});
			//res.send({todos: data});
		});
		});
	});

	app.post('/todo2', urlencodedParser, function(req, res)
	{
		/*Todo.find({item: req.body}).remove(function(err, data){
			if(err)
			{
				throw err;
			}
			res.json(data);
		});*/
		Todo.find({}, function(err, data)
			{
			if(err)
			{
				throw err;
			}
			res.render('todopage', {todos: data});
			//res.send({todos: data});
			});
	});

	app.delete('/todo/:item', function(req, res)
	{
		Todo.find({}, function(err, data)
			{
			if(err)
			{
				throw err;
			}
			res.render('todopage', {todos: data});
			//res.send({todos: data});
			});
	});
}
