const request = require('supertest');
const app = require('../src/app');

jest.mock('../src/services/campaign.service');
const campaignService = require('../src/services/campaign.service');

describe('Campaign controller', () => {
  it('POST /campaigns should create a campaign', async () => {
    const payload = {
      name: 'Test Campaign',
      advertiser: 'Acme Corp',
      budget: 1000,
      startDate: '2026-01-01',
      endDate: '2026-12-31'
    };

    const created = { ...payload, _id: '640000000000000000000001' };
    campaignService.createCampaign.mockResolvedValue(created);

    const res = await request(app).post('/campaigns').send(payload).expect(201);

    expect(campaignService.createCampaign).toHaveBeenCalledWith(payload);
    expect(res.body).toHaveProperty('_id');
    expect(res.body.name).toBe('Test Campaign');
  });
});
