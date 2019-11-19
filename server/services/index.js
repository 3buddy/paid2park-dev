const admin    = require("./admin");
const customer = require('./customer');
const kiosk    = require('./kiosk');
const claim    = require('./claim');
const role   = require('./role');
const user   = require('./user'); 
const vehicle   = require('./vehicle');
const enforcements   = require('./enforcements');
const payment   = require('./payment');
const passes         = require('./passes');
const deployment     = require('./deployment');

module.exports = {
  admin,
  claim,
  role,
  user,
  customer,
  kiosk,
  vehicle,
  enforcements,
  payment,
  passes,
  deployment
}