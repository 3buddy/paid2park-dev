let admin    = require("./admin");
let customer = require('./customer');
let kiosk    = require('./kiosk');
let claim    = require('./claim');
const role   = require('./role');
const user   = require('./user'); 

module.exports = {
  admin,
  claim,
  role,
  user,
  customer,
  kiosk
}