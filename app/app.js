var socket = io.connect();

var username = "";
var password = "";

var loginE = document.getElementById('login');
var signupE = document.getElementById('signup');
var gameE = document.getElementById('game');

function hide(element) {
  element.style.display = 'none';
}
function show(element) {
  element.style.display = 'inherit';
}

function sendLogin() {
  username = document.getElementById('loginU').innerHTML;
  password = document.getElementById('loginP').innerHTML;
  socket.emit('login', username, password);
}

socket.on('loginSuccess', function() {
  hide(loginE);
  hide(signupE);
  show(gameE);
});

socket.on('wrongPassword', function() {
  document.getElementById('wrongPass').style.display = 'inline';
});
