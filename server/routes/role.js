const express = require("express");
const router = express.Router();
const services = require("../services");

router.post('/add-role',services.role.addRole);
router.post('/edit-role', services.role.editRole);
router.get('/get-role-list', services.role.getRoleList);
router.get('/get-role-details/:roleId', services.role.getRoleDetails);

module.exports = router