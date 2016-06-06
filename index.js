var express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');
var usernames = {};



app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});



io.on('connection', function(socket){
  //add to list
  socket.on('name', function(userid){
    usernames[socket.id] = userid;
  });  

  //send message
  socket.on('chat message', function(msg){
    io.emit('chat message', {"user" :usernames[socket.id], "message": msg});
  });
  
  //delete from list
  socket.on("disconnect", function(){
    delete usernames[socket.id];
    });

});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
