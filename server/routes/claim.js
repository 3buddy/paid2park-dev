const express = require("express");
const router = express.Router();
const services = require("../services");

router.post('/add-cliam',services.claim.addClaim);
router.get('/get-claim', services.claim.getClaim);
router.post('/add-claim-States', services.claim.addClaimStates);

module.exports = router