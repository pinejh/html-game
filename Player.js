"use strict";
class Player {
  constructor(username, password, id) {
    this.username = username;
    this.password = password;
    this.id = id;
    this.balance = 0.00;
    this.file = './saves/'+username+'.json';
  }
  getBal() {
    return this.money.toFixed(2);;
  }
  setBal(amt) {
    this.balance = amt;
  }
  addBal(amt) {
    this.balance += amt;
  }
  removeBal(amt) {
    this.balance -= amt;
  }
}
module.exports = Player;
