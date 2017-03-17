var express = require('express');
var app = express();
var server = require('http').createServer(app);
var path = require('path');
app.use(express.static(path.join(__dirname, 'app')));

var io = require('socket.io').listen(server);

var Player = require('./Player.js');

var jsonfile = require('jsonfile');
var accFile = './accounts.json';
var acc = [];

jsonfile.readFile(accFile, function(err, obj) {
  acc = obj;
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/app/index.html');
});

server.listen(3000, function(){
  console.log('listening on *:3000');
});

io.sockets.on('connection', function(socket) {
  socket.on('login', function(username, password) {
    var returned = false;
    for(a of acc) {
      if(a.username == username && a.password == password) {
        socket.emit('loginSuccess');
        returned = true;
      } else if(a.username == username) {
        socket.emit('wrongPassword');
        returned = true;
      }
    }
    if(!returned) socket.emit('userUnknown');
  });
  socket.on('signup', function(username, password) {
    var returned = false;
    for(a of acc) {
      if(a.username == username) {
        socket.emit('nameTaken');
        returned = true;
      }
    }
    if(!returned) {
      acc.push(new Player(username, password, 0.00));
      updateAccFile();
      socket.emit('signupSuccess');
    }
  });
});

function updateAccFile() {
  jsonfile.writeFile(accFile, acc, function (err) {
    //console.error(err);
  });
}
