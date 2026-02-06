jest.mock('../src/models/Campaign', () => ({
  findById: jest.fn(),
  create: jest.fn()
}));

const Campaign = require('../src/models/Campaign');
const campaignService = require('../src/services/campaign.service');

describe('Campaign service', () => {
  it('getCampaignStats should compute CTR and CPC correctly', async () => {
    const fake = {
      impressions: 1000,
      clicks: 50,
      budget: 200
    };

    Campaign.findById.mockResolvedValue(fake);

    const stats = await campaignService.getCampaignStats('anyid');

    expect(stats.impressions).toBe(1000);
    expect(stats.clicks).toBe(50);
    expect(stats.budget).toBe(200);
    expect(stats.ctr).toBeCloseTo(50 / 1000);
    expect(stats.cpc).toBeCloseTo(200 / 50);
  });
});
