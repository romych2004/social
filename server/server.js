var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var db = require('./config/db');
var users = require('./controller/users');
var menu = require('./controller/menu');
var news = require('./controller/news');
var likes = require('./controller/like');
var messages = require('./controller/message');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req,res,next){setTimeout(next,500)});

app.get('/api', function (req, res) {
	res.send("API works");
});

/**************************************
 * 				USERS 				
 ***************************************/
app.get('/api/users', function (req, res) {
	res.json({
		data: users.getUsers(req.params)
	});
});
app.get('/api/users/:id', function (req, res) {
	var item = users.getUserById(req.params.id);
	if (item) {
		res.json({
			data: item
		});
	} else {
		res.sendStatus(404); // not found
	}
});
app.post('/api/users', function (req, res) {
	users.createUser(req.body);
	res.sendStatus(201);
});
app.put('/api/users/:id', function (req, res) {
	res.sendStatus(501); // not implemented
});
app.delete('/api/users/:id', function (req, res) {
	res.sendStatus(501); // not implemented
});


/**************************************
 * 				NEWS 				
 ***************************************/
app.get('/api/news', function (req, res) {
	res.sendStatus(501); // такого быть не должно. обязательно передавать тип новости
});
app.get('/api/news/:parentId', function (req, res) {
	res.json({
		data: news.getNews(req.params)
	});
});

app.post('/api/news', function (req, res) {
	res.sendStatus(501); // такого быть не должно. обязательно передавать тип новости
});
app.post('/api/news/:parentId', function (req, res) {
	res.json({
		data: news.createNews(req.params.parentId, req.body)
	});
});
app.get('/api/news/:parentId/:id', function (req, res) {
	res.sendStatus(501); // not implemented
});
app.put('/api/news/:parentId/:id', function (req, res) {
	res.sendStatus(501); // not implemented
});
app.delete('/api/news/:parentId/:id', function (req, res) {
	res.sendStatus(501); // not implemented
});


/**************************************
 * 				MENU 				
 ***************************************/
app.get('/api/menu/:page', function (req, res) {
	res.json({data: 
		menu.getMenu(req.params.page)
	});
});


/**************************************
 * 				LIKES 				
 ***************************************/
app.get('/api/like/:parentId', function (req, res) {
	res.json({
		data: likes.getLikes(req.params)
	});
});
app.post('/api/like', function (req, res) {
	res.json({
		data: likes.addLike(req.body)
	});
});
app.delete('/api/like/:parentId', function (req, res) {
	res.json({
		data: likes.removeLike(req.params)
	});
});


/**************************************
 * 				MESSAGES 				
 ***************************************/
app.get('/api/message', function (req, res) {
	res.json({
		data: messages.getRooms(req.params)
	});
});
app.get('/api/message/:roomId', function (req, res) {
	res.json({
		data: messages.getMessagesByRoomId(req.params)
	});
});



app.listen(3000, function () {
	console.log('Listening on port 3000!');
});


