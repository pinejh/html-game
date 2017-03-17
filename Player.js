"use strict";
class Player {
  constructor(username, password, balance) {
    this.username = username;
    this.password = password;
    this.balance = balance;
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
