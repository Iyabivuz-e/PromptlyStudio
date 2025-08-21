const express = require('express');
const router = express.Router();
const { generateCode } = require('../routes/codegenController');

router.post('/', generateCode);

module.exports = router;
