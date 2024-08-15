const express = require('express');
const { submitBooking } = require('../controllers/booking.controller');
const router = express.Router()

router.post('/', submitBooking)
module.exports = router;