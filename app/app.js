var socket = io.connect();

var username = "";
var password = "";
var confirm = "";

var id = 0;
var data = {};

var loginE = document.getElementById('login');
var signupE = document.getElementById('signup');
var gameE = document.getElementById('game');

function hide(element) {
  element.style.display = 'none';
}
function show(element) {
  element.style.display = 'inherit';
}

function login() {
  username = document.getElementById('loginU').value;
  password = document.getElementById('loginP').value;
  hide(document.getElementById('loginI'));
  document.getElementById('loginS').style.display = 'inline';
  socket.emit('login', username, password);
}

socket.on('loginSuccess', function(ID, d) {
  id = ID;
  data = d;
  hide(loginE);
  hide(signupE);
  show(gameE);
  console.log(getBal());
});

socket.on('wrongPassword', function() {
  document.getElementById('wrongUser').style.display = 'none';
  document.getElementById('wrongPass').style.display = 'inline';
  hide(document.getElementById('loginS'));
  document.getElementById('loginI').style.display = 'inline';
});

socket.on('userUnknown', function() {
  document.getElementById('wrongUser').style.display = 'inline';
  document.getElementById('wrongPass').style.display = 'none';
  hide(document.getElementById('loginS'));
  document.getElementById('loginI').style.display = 'inline';
});

function signup() {
  hide(document.getElementById('nameTaken'));
  username = document.getElementById('signupU').value;
  password = document.getElementById('signupP').value;
  confirm = document.getElementById('signupC').value;
  if(username.length >= 6 && password == confirm && password.length >= 6) {
    hide(document.getElementById('emptyName'));
    hide(document.getElementById('emptyPass'));
    hide(document.getElementById('passMatch'));
    socket.emit('signup', username, password);
  } else {
    if(username.length < 6) {
      document.getElementById('emptyName').style.display = 'inline';
    }
    if(password.length < 6) {
      document.getElementById('emptyPass').style.display = 'inline';
    }
    if(password != confirm) {
      document.getElementById('passMatch').style.display = 'inline';
    }
  }
}

socket.on('nameTaken', function() {
  document.getElementById('nameTaken').style.display = 'inline';
});

function save() {
  socket.emit('save', id, data);
}
