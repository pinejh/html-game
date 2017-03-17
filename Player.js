"use strict";
class Player {
  constructor(username, password, id) {
    this.username = username;
    this.password = password;
    this.id = id;
    this.file = './saves/'+username+'.json';
  }
}
module.exports = Player;
