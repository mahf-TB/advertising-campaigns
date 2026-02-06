const campaignService = require('../services/campaign.service');

const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

const createCampaign = asyncHandler(async (req, res) => {
  const payload = req.body;
  const campaign = await campaignService.createCampaign(payload);
  res.status(201).json(campaign);
});

const listCampaigns = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, status } = req.query;
  const result = await campaignService.getCampaigns({ page, limit, status });
  res.json(result);
});

const getCampaign = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const campaign = await campaignService.getCampaignById(id);
  if (!campaign) return res.status(404).json({ message: 'Campaign not found' });
  res.json(campaign);
});

const patchStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const updated = await campaignService.updateCampaignStatus(id, status);
  if (!updated) return res.status(404).json({ message: 'Campaign not found' });
  res.json(updated);
});

const getStats = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const stats = await campaignService.getCampaignStats(id);
  if (!stats) return res.status(404).json({ message: 'Campaign not found' });
  res.json(stats);
});

module.exports = {
  createCampaign,
  listCampaigns,
  getCampaign,
  patchStatus,
  getStats
};
