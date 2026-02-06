const mongoose = require("mongoose");

const { Schema } = mongoose;

const campaignSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    advertiser: {
      type: String,
      required: [true, "Advertiser is required"],
    },
    budget: {
      type: Number,
      required: [true, "Budget is required"],
      min: [0, "Budget must be >= 0"],
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },
    endDate: {
      type: Date,
      required: [true, "End date is required"],
      validate: {
        validator: function (value) {
          if (!this.startDate) return true;
          return value > this.startDate;
        },
        message: "End date must be after start date",
      },
    },
    status: {
      type: String,
      enum: ["active", "paused", "finished"],
      default: "paused",
    },
    impressions: {
      type: Number,
      default: 0,
      min: [0, "Impressions must be >= 0"],
    },
    clicks: {
      type: Number,
      default: 0,
      min: [0, "Clicks must be >= 0"],
    },
  },
  { timestamps: true },
);

const Campaign = mongoose.model("Campaign", campaignSchema);

module.exports = Campaign;
