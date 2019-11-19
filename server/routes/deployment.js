const express = require("express");
const router = express.Router();
const services = require("../services/deployment");


router.post("/add-deployment", services.addDeployment);
router.get('/get-deployment-list', services.getDeployment);
router.get('/get-deployment-details/:deployment_id', services.getDeploymentDetails)
router.delete("/delete-deployment/:deployment_id", services.deleteDeployment);
router.post('/edit-deployment', services.updateDeployment);

module.exports = router;