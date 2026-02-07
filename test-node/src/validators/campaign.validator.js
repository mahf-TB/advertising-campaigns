const Joi = require('joi');
const mongoose = require('mongoose');

const createCampaignSchema = Joi.object({
  name: Joi.string().required(),
  advertiser: Joi.string().required(),
  budget: Joi.number().min(0),
  startDate: Joi.date().required(),
  endDate: Joi.date().greater(Joi.ref('startDate')),
  status: Joi.string().valid('active', 'paused', 'finished'),
  impressions: Joi.number().min(0),
  clicks: Joi.number().min(0),
});

const statusUpdateSchema = Joi.object({
  status: Joi.string().valid('active', 'paused', 'finished').required()
});

const updateCampaignSchema = Joi.object({
  name: Joi.string(),
  advertiser: Joi.string(),
  budget: Joi.number().min(0),
  startDate: Joi.date(),
  endDate: Joi.date().greater(Joi.ref('startDate')),
  status: Joi.string().valid('active', 'paused', 'finished'),
  impressions: Joi.number().min(0),
  clicks: Joi.number().min(0),
}).min(1);

const validateCreateCampaign = (req, res, next) => {
  const { error } = createCampaignSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

const validateStatusUpdate = (req, res, next) => {
  const { error } = statusUpdateSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

const validateUpdateCampaign = (req, res, next) => {
  const { error } = updateCampaignSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};

const validateObjectId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid campaign ID' });
  }
  next();
};


module.exports = {
  validateCreateCampaign,
  validateStatusUpdate,
  validateUpdateCampaign,
  validateObjectId,
};