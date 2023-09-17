const express = require("express");
const { generateShortId } = require("../controllers/url");

const router = express.Router();
router.post("/", generateShortId);

module.exports = router;