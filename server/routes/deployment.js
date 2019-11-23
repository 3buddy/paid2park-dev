const express = require("express");
const router = express.Router();
const services = require("../services/deployment");


router.post("/add-deployment", services.addDeployment);
router.get('/get-deployment-list', services.getDeployment);
router.get('/get-deployment-details/:deployment_id', services.getDeploymentDetails)
router.delete("/delete-deployment/:deployment_id", services.deleteDeployment);
router.post('/edit-deployment', services.updateDeployment);


router.post("/add-deployment-app-rate", services.addDeploymentAppRate);
router.get('/get-deployment-app-rate/:deployment_id', services.getDeploymentAppRate);
router.get('/get-deployment-app-rate-details/:deployment_app_rate_id', services.getDeploymentAppRateDetails)
router.delete("/delete-deployment-app-rate/:deployment_app_rate_id", services.deleteDeploymentAppRate);
router.post('/edit-deployment-app-rate', services.updateDeploymentAppRate);

router.post("/add-deployment-pass-rate", services.addDeploymentPassRate);
router.get('/get-deployment-pass-rate/:deployment_id', services.getDeploymentPassRate);
router.get('/get-deployment-pass-rate-details/:deployment_pass_rate_id', services.getDeploymentPassRateDetails)
router.delete("/delete-deployment-pass-rate/:deployment_pass_rate_id", services.deleteDeploymentPassRate);
router.post('/edit-deployment-pass-rate', services.updateDeploymentPassRate);


module.exports = router;