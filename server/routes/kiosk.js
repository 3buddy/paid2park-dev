let express = require('express');
let router = express.Router();
let services = require('../services/kiosk');

router.post('/add',services.addBillingData);

module.exports = router;