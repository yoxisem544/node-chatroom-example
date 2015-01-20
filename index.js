var app = require('express')();
var http = require('http').Server(app);
var http2 = require('http').Server(app);
var io = require('socket.io')(http);
var io2 = require('socket.io')(http2);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
  	console.log(msg);
    io.emit('chat message', msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});

http2.listen(3001, function(){
  console.log('listening on *:3001');
});

io2.on('connection', function(socket){
  socket.on('chat message', function(msg){
  	console.log(msg);
    io2.emit('chat message', msg);
  });
});