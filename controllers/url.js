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

module.exports = {
  generateShortId,
};
