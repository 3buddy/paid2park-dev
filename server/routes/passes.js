const express = require("express");
const router = express.Router();
const services = require("../services");

router.post('/add-passes',services.passes.addPasses);
router.get('/get-passes-list', services.passes.getPassesList);
router.get('/get-passes-details/:passes_id', services.passes.getPassesDetails);
router.post('/update-passes', services.passes.updatePasses);
router.delete("/delete-passes/:passes_id", services.passes.deletePasses);


module.exports = router