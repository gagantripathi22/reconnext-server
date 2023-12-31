const express = require('express');
const router = express.Router();
const adminController = require('../controller/admin.controller');
const basicAuthentication = require('../middleware/basicAuth');
const verifyToken = require('../middleware/verifyToken');

router.post('/admin/new', adminController.addAdmin);
router.post('/admin/login', adminController.loginAdmin);
router.post(
  '/admin/verifyToken',
  verifyToken.verifyToken,
  adminController.verifyClientSideToken
);

// Testing Purpose
router.get('/admin/getAllAdmin', adminController.getAllAdmins);
router.delete('/admin/removeAdmin/:id', adminController.removeAdmin);
// Testing Purpose

module.exports = router;
