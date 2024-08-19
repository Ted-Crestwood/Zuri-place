const express = require('express');
const contactSubmition = require('../controllers/contact.controller');
const router = express.Router()

router.post('/', contactSubmition)
module.exports = router;