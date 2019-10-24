const admin = require("./admin");
const customer = require("./customer");
const kiosk = require("./kiosk");
const claim = require('./claim');
const role  = require('./role');
const user  = require('./user');
const vehicle    = require('./vehicle');


module.exports = {
    admin,
    customer,
    kiosk,
    claim,
    role,
    user,
    vehicle
}