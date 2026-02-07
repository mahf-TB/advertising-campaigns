type Campaign = {
  _id: string;
  name: string;
  startDate: string;
  advertiser: string;
  endDate: string;
  status: "active" | "paused" | "finished" | string;
  budget: number;
  impressions: number;
  clicks: number;
  createdAt: string;
  updatedAt: string;
};

type CampaignWithStats = Campaign & { ctr: number; cpc: number };

type CampaignListParams = {
  page?: number;
  limit?: number;
  status?: string;
  search?: string;
  startDate?: string;
  endDate?: string;
};

type CampaignListResponse = {
  items: Campaign[];
  page: number;
  limit: number;
  total: number;
};
