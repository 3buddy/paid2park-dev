const express = require("express");
const router = express.Router();
const services = require("../services");

router.post('/add-enforcements',services.enforcements.addEnforcements);
router.get('/get-enforcements',services.enforcements.getEnforcements);
router.get('/get-enforcements-details/:enforcements_id',services.enforcements.getEnforcementsDetails);
router.post('/update-enforcements',services.enforcements.updateEnforcements);
router.delete('/delete-enforcements/:enforcements_id',services.enforcements.deleteEnforcements);





module.exports = router