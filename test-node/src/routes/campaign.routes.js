const express = require("express");
const router = express.Router();
const controller = require("../controllers/campaign.controller");
const {
  validateCreateCampaign,
  validateObjectId,
  validateStatusUpdate,
  validateUpdateCampaign,
} = require("../validators/campaign.validator");

router.post("/", validateCreateCampaign, controller.createCampaign);
router.put(
  "/:id",
  validateObjectId,
  validateUpdateCampaign,
  controller.updateCampaign,
);

router.get("/", controller.listCampaigns);

router.get("/:id", validateObjectId, controller.getCampaign);

router.patch(
  "/:id/status",
  validateObjectId,
  validateStatusUpdate,
  controller.patchStatus,
);

router.get("/:id/stats", validateObjectId, controller.getStats);

module.exports = router;
