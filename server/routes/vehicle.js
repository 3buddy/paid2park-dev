const express = require("express");
const router = express.Router();
const services = require("../services");

router.post('/add-vehicle',services.vehicle.addVehicle);
router.get('/get-vehicle-list', services.vehicle.getVehicleList);
router.get('/get-vehicle-details/:vehicleId', services.vehicle.getVehicleDetails);
router.post('/update-vehicle', services.vehicle.updateVehicle);
router.delete("/delete-vehicle/:vehicleId", services.vehicle.deleteVehicle);


module.exports = router