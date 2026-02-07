import api from "../lib/axios";

export async function listCampaigns(
  params: CampaignListParams = {},
): Promise<CampaignListResponse> {
  const res = await api.get<CampaignListResponse>("/campaigns", { params });
  return res.data;
}

export async function getCampaign(id: string): Promise<Campaign> {
  const res = await api.get<Campaign>(`/campaigns/${id}`);
  return res.data;
}

export async function getCampaignWithStats(
  id: string,
): Promise<CampaignWithStats> {
  const res = await api.get<CampaignWithStats>(
    `/campaigns/${id}/stats`,
  );
  return res.data;
}

export async function createCampaign(
  payload: Partial<Campaign>,
): Promise<Campaign> {
  const res = await api.post<Campaign>("/campaigns", payload);
  return res.data;
}

export async function updateCampaign(
  id: string,
  payload: Partial<Campaign>,
): Promise<Campaign> {
  const res = await api.put<Campaign>(`/campaigns/${id}`, payload);
  return res.data;
}

export async function patchCampaignStatus(
  id: string,
  status: string,
): Promise<Campaign> {
  const res = await api.patch<Campaign>(`/campaigns/${id}/status`, { status });
  return res.data;
}

export async function deleteCampaign(id: string): Promise<void> {
  await api.delete(`/campaigns/${id}`);
}
