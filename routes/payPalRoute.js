const express = require('express');
const paypalController = require('../controllers/payPalController');
const verifyToken = require('../middleware/verifyToken');
const { verify } = require('jsonwebtoken');
const router = express.Router();

// router.post('/create-subscription', /*verifyToken,*/ paypalController.createSubscription);
// router.get('/execute-subscription', /*verifyToken,*/ paypalController.executeSubscription);

router.route('/create-subscription').post(/*verifyToken,*/ paypalController.createSubscription)
router.route('/execute-subscription').get(/*verifyToken,*/ paypalController.executeSubscription)  
module.exports = router;
