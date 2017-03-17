function getBal() {
  return data.balance.toFixed(2);
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
