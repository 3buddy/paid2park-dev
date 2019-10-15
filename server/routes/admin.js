const express = require("express");
const router = express.Router();
const services = require("../services");

router.post('/login',services.admin.login);
router.post('/signup', services.admin.signup);

router.post('/addClaim', services.claim.addClaim);
router.get('/getClaim', services.claim.getClaim);

router.post("/usersList", services.admin.getUserLists);
router.delete("/user/", services.admin.deleteUser);
router.put("/user", services.admin.updateData);


module.exports = router