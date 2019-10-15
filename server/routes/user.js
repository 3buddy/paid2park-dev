const express = require("express");
const router = express.Router();
const services = require("../services");

router.post('/add-user',services.user.addUser);
router.post('/edit-user', services.user.editUser);
router.get('/get-user-list',services.user.getUserList);
router.get('/get-user-details/:userId',services.user.getUserDetails);
router.delete('/delete-user',services.user.deleteUser);

module.exports = router