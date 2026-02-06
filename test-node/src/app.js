const express = require("express");
const cors = require("cors");
const { errorHandler } = require("./middlewares/error.middleware");
const campaignRoutes = require('./routes/campaign.routes');
const app = express();

app.use(cors());
app.use(express.json());

  app.use('/campaigns', campaignRoutes);


// Error handler
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("API AdTech running");
});

module.exports = app;
