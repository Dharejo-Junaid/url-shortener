const shortid = require("shortid");
const URL = require("../models/url");

const generateShortId = async (req, res) => {
  const body = req.body;

  if (!body.url)
    return res.status(400).json({
      error: "URL is required",
    });

  const shortId = shortid.generate();
  await URL.create({ shortId, redirectURL: body.url, timestamp: [] });

  return res.status(201).json({
    url: shortId,
  });
};

const handleGetAnalytics = async (req, res) => {
  const shortId = req.params.shortId;

  if (!shortId)
    return res.status(400).json({
      error: "short id is required",
    });

  const result = await URL.findOne({ shortId });

  if (!result)
    return res.status(404).json({
      error: "short id is not valid",
    });

  return res.status(200).json({
    total_clicks: result.timestamp.length,
    analytics: result.timestamp,
  });
};

module.exports = {
  generateShortId,
  handleGetAnalytics,
};
