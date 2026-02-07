const Campaign = require('../models/Campaign');

const createCampaign = async (data) => {
  const campaign = await Campaign.create(data);
  return campaign;
};

const getCampaigns = async ({ page = 1, limit = 10, status }) => {
  const query = {};
  if (status) query.status = status;

  const skip = (page - 1) * limit;
  const [items, total] = await Promise.all([
    Campaign.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
    Campaign.countDocuments(query)
  ]);

  return {
    items,
    total,
    page: Number(page),
    limit: Number(limit)
  };
};

const getCampaignById = async (id) => {
  const campaign = await Campaign.findById(id);
  return campaign;
};

const updateCampaignStatus = async (id, status) => {
  const campaign = await Campaign.findByIdAndUpdate(id, { status }, { new: true });
  return campaign;
};

const updateCampaign = async (id, data) => {
  const campaign = await Campaign.findByIdAndUpdate(id, data, { new: true, runValidators: true });
  return campaign;
};

const getCampaignStats = async (id) => {
  const campaign = await Campaign.findById(id);
  if (!campaign) return null;

  const impressions = campaign.impressions || 0;
  const clicks = campaign.clicks || 0;
  const budget = campaign.budget || 0;

  const ctr = impressions === 0 ? 0 : clicks / impressions;
  const cpc = clicks === 0 ? null : budget / clicks;

  const base = typeof campaign.toObject === 'function' ? campaign.toObject() : campaign;

  return {
    ...base,
    impressions,
    clicks,
    budget,
    ctr:ctr * 100,
    cpc 
  };
};

module.exports = {
  createCampaign,
  getCampaigns,
  getCampaignById,
  updateCampaignStatus,
  updateCampaign,
  getCampaignStats
};
