// IDEA: Private investigator/FBI agent/Detective simulator game




var board = document.getElementById('messageBoard');

var msgs = 0;
var msgArr = [];

function getBal() {
  return data.balance;
}
function setBal(amt) {
  data.balance = amt;
}
function addBal(amt) {
  data.balance += amt;
}
function removeBal(amt) {
  data.balance -= amt;
}
function dispBal() {
  return "$"+data.balance.toFixed(2);
}
function msgBal() {
  newMsg('Your current balance is <span class="color__money" onclick="togglePin('+msgs+')">'+dispBal()+'</span>');
}

function newMsg(msg) {
  board.innerHTML += '<li id="msg'+msgs+'" class="message">'+msg+'</li>';
  msgArr.push({show:0, msg:'<li id="msg'+msgs+'" class="message">'+msg+'</li>'});
  msgs++;
}
function system(msg) {
  board.innerHTML += '<li id="msg'+msgs+'" class="system" onclick="togglePin('+msgs+')" onmouseenter="showPin('+msgs+')" onmouseleave="hidePin('+msgs+')"><span id="show'+msgs+'" style="display:none"><i id="pin'+msgs+'" class="fa fa-bookmark-o" aria-hidden="true"></i><i id="pinned'+msgs+'" class="fa fa-bookmark" aria-hidden="true" style="display:none"></i> </span>[SYSTEM]: '+msg+'</li>';
  msgArr.push({show:0, pinned:false, msg:'<li id="msg'+msgs+'" class="system" onclick="togglePin('+msgs+')" onmouseenter="showPin('+msgs+')" onmouseleave="hidePin('+msgs+')"><span id="show'+msgs+'" style="display:none"><i id="pin'+msgs+'" class="fa fa-bookmark-o" aria-hidden="true"></i><i id="pinned'+msgs+'" class="fa fa-bookmark" aria-hidden="true" style="display:none"></i> </span>[SYSTEM]: '+msg+'</li>'});
  msgs++;
}
function userMsg(user, msg) {
  board.innerHTML += '<li id="msg'+msgs+'" class="userMsg" onclick="togglePin('+msgs+')" onmouseenter="showPin('+msgs+')" onmouseleave="hidePin('+msgs+')"><span id="show'+msgs+'" style="display:none"><i id="pin'+msgs+'" class="fa fa-bookmark-o" aria-hidden="true"></i><i id="pinned'+msgs+'" class="fa fa-bookmark" aria-hidden="true" style="display:none"></i> </span>['+user+']: '+msg+'</li>';
  msgArr.push({show:0, pinned:false, msg:'<li id="msg'+msgs+'" class="userMsg" onclick="togglePin('+msgs+')" onmouseenter="showPin('+msgs+')" onmouseleave="hidePin('+msgs+')"><span id="show'+msgs+'" style="display:none"><i id="pin'+msgs+'" class="fa fa-bookmark-o" aria-hidden="true"></i><i id="pinned'+msgs+'" class="fa fa-bookmark" aria-hidden="true" style="display:none"></i> </span>['+user+']: '+msg+'</li>'});
  msgs++;
}
function clear() {
  board.innerHTML = '';
  msgArr = [];
  msgs = 0;
}

function showPin(id) {
  if(msgArr[id].show == 0) {
    document.getElementById('show'+id).style.display = 'inline';
    msgArr[id].show = 1;
  }
}
function hidePin(id) {
  if(msgArr[id].show == 1) {
    document.getElementById('show'+id).style.display = 'none';
    msgArr[id].show = 0;
  }
}
function togglePin(id) {
  if(document.getElementById('pin'+id).style.display == 'none') {
    document.getElementById('pin'+id).style.display = 'inline';
    document.getElementById('pinned'+id).style.display = 'none';
    msgArr[id].pinned = false;
  } else {
    document.getElementById('pin'+id).style.display = 'none';
    document.getElementById('pinned'+id).style.display = 'inline';
    msgArr[id].pinned = true;
  }
}

function sleep(sec) {
  setTimeout(function() {
    console.log('sleep');
  }, sec * 1000);
}

function init() {
  setTimeout(function() {
    system('You joined as user '+username);
  }, 1000);
  setTimeout(function() {
    msgBal();
  }, 2000);
}
