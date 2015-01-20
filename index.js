var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
// var http2 = require('http').Server(app);
// var io2 = require('socket.io')(http2);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

var allClients = [];
var people = {};

io.on('connection', function(socket){
	allClients.push(socket);
	// console.log(allClients);
	console.log("client = " + allClients.length);
	socket.on('chat message', function(msg){
		console.log(msg);
		io.emit('chat message', msg);
	});

	socket.on('join', function(name) {
		people[socket.id] = name;
		io.emit("join", name);
		console.log(name);
		console.log(people);
	})

	socket.on('disconnect', function() {
		console.log('someone disconnected from server');

		var i = allClients.indexOf(socket);
		io.emit('chat message', people[socket.id]+" has leaved.")
		console.log('client ' + i + ' disconnected from server');
		delete allClients[i];
		delete people[socket.id];
		// clean empty clients
		allClients = allClients.filter(function(n){ return n !== undefined; });
	})
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

// http2.listen(3001, function(){
//   console.log('listening on *:3001');
// });

// io2.on('connection', function(socket){
//   socket.on('chat message', function(msg){
//   	console.log(msg);
//     io2.emit('chat message', msg);
//   });
// });