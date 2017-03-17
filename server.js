var express = require('express');
var app = express();
var server = require('http').createServer(app);
var path = require('path');
app.use(express.static(path.join(__dirname, 'app')));

var io = require('socket.io').listen(server);

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
    for(a of acc) {
      if(a.username == username && a.password == password) socket.emit('loginSuccess');
      else if(a.username == username) socket.emit('wrongPassword');
    }
  });
});

function updateAccFile() {
  jsonfile.writeFile(accFile, acc, function (err) {
    //console.error(err);
  });
}
