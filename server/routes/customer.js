const express = require("express");
const router = express.Router();
const services = require("../services/customer");


router.post("/add-customer", services.addCustomer);
router.get('/get-customer-list', services.getCustomer);
router.get('/get-customer-details/:customerId', services.getCustomerDetails)
router.delete("/delete-customer", services.deleteCustomer);
router.post('/edit-customer', services.updateCustomer);

module.exports = router;