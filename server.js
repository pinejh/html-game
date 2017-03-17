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
        var data = {};
        jsonfile.readFile(a.file, function(err, obj) {
          data = obj;
        });
        returned = true;
        setTimeout(function() {
          socket.emit('loginSuccess', a.id, data);
          console.log('User "'+username+'" logged in');
        }, 500);
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
      acc.push(new Player(username, password, acc.length));
      var data = {balance:0.00};
      jsonfile.writeFile(acc[acc.length-1].file, data, function (err) {});
      updateAccFile();
      socket.emit('loginSuccess', acc[acc.length-1].id, data);
      console.log('Created new account "'+username+'"');
    }
  });
  socket.on('save', function(id, save) {
    console.log('Saving data for user "'+acc[id].username+'"');
    jsonfile.writeFile(acc[id].file, data, function (err) {});
    console.log('Data saved for user "'+acc[id].username+'"');
  });
});

function updateAccFile() {
  jsonfile.writeFile(accFile, acc, function (err) {
    //console.error(err);
  });
}
