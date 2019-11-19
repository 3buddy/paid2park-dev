const express = require("express");
const router = express.Router();
const services = require("../services");

router.post('/add-ticket-payment',services.payment.addTicketPayment);
router.post('/add-parking-payment',services.payment.addParkingPayments);

router.get('/get-ticket-payment', services.payment.getTicketPayment);
router.get('/get-parking-payment', services.payment.getParkingPayment);

router.get('/get-ticket-payment-details/:ticket_payment_id', services.payment.getTicketPaymentDetails);
router.get('/get-parking-payment-details/:parking_payment_id', services.payment.getParkingPaymentDetails);

router.post('/update-ticket-payment', services.payment.updateTicketPayment);
router.post('/update-parking-payment', services.payment.updateParkingPayment);

router.delete("/delete-ticket-payment/:ticket_payment_id", services.payment.deleteTicketPayment);
router.delete("/delete-parking-payment/:parking_payment_id", services.payment.deleteParkingPayment);

module.exports = router