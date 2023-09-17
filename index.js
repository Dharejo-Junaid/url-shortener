const express = require("express");
const urlRouter = require("./routes/url");
const mongoose = require("mongoose");
const URL = require("./models/url");

const app = express();
const PORT = 5000;
const MONGODB_URL = "mongodb://localhost:27017/short-url";

// middlewares;
app.use(express.json());

// routers;
app.use("/url", urlRouter);

app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;

  const result = await URL.findOneAndUpdate(
    { shortId },
    { $push: { timestamp: Date.now() } }
  );

  if (!result)
    return res.status(404).json({
      error: "URL is invalid",
    });

  return res.redirect(result.redirectURL);
});

// DB connection then start server;
mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("Database connected");
    app.listen(PORT, () => console.log(`Server started at PORT = ${PORT}`));
  })
  .catch((err) => {
    console.log("Database connection fail");
  });
