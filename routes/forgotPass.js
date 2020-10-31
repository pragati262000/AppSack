const express = require('express');
const router = express.Router();

const passController = require('../controllers/forgot_password_controller');

router.get('/reset-password',passController.resetPassReq);
router.post('/update_pass_email',passController.update_pass);
router.get('/recover/:accessToken',passController.recover);
router.post('/recover/:accessToken',passController.set);

module.exports = router;