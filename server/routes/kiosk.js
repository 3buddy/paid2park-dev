const express = require("express");
const router = express.Router();
const services = require("../services");

router.post('/add-kiosk',services.kiosk.addKiosk);
router.get('/get-kiosk-list', services.kiosk.getKioskList);
router.get('/get-kiosk-details/:kioskId', services.kiosk.getKioskDetails);
router.post('/update-kiosk', services.kiosk.updateKiosk);
router.delete("/delete-kiosk/:kioskId", services.kiosk.deleteKiosk);


module.exports = router