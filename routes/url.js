const express = require("express");
const { generateShortId, handleGetAnalytics } = require("../controllers/url");

const router = express.Router();
router.post("/:shortId", generateShortId);
router.get("/analytics/:shortId", handleGetAnalytics);

module.exports = router;
