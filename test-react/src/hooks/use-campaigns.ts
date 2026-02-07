import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createCampaign,
  deleteCampaign,
  getCampaign,
  getCampaignWithStats,
  listCampaigns,
  patchCampaignStatus,
  updateCampaign,
} from "../services/campains.service";

export type Campaign = Record<string, unknown>;
export type CampaignInput = Partial<Campaign>;

const CAMPAIGNS_KEY = ["campaigns"] as const;

export const useCampaigns = (params: CampaignListParams = {}) => {
  const query = useQuery({
    queryKey: [...CAMPAIGNS_KEY, params],
    queryFn: () => listCampaigns(params),
  });
  const { data } = query;
  const items = data?.items || [];
  const pagination = {
    page: data?.page || 1,
    limit: data?.limit || 10,
    total: data?.total || 0,
  };
  return { ...query, items, pagination };
};

export const useCampaign = (id?: string) => {
  return useQuery({
    queryKey: [...CAMPAIGNS_KEY, id],
    queryFn: () => getCampaign(id as string),
    enabled: Boolean(id),
  });
};

export const useCampaignWithStats = (id?: string) => {
  return useQuery({
    queryKey: [...CAMPAIGNS_KEY, id, 'stats'],
    queryFn: () => getCampaignWithStats(id as string),
    enabled: Boolean(id),
  });
};

export const useCreateCampaign = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createCampaign,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CAMPAIGNS_KEY });
    },
  });
};

export const useUpdateCampaign = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: { id: string; payload: CampaignInput }) =>
      updateCampaign(params.id, params.payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: CAMPAIGNS_KEY });
      queryClient.invalidateQueries({ queryKey: [...CAMPAIGNS_KEY, variables.id] });
    },
  });
};

export const useDeleteCampaign = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCampaign,
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: CAMPAIGNS_KEY });
      queryClient.invalidateQueries({ queryKey: [...CAMPAIGNS_KEY, id] });
    },
  });
};

export const usePatchCampaignStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params: { id: string; status: string }) =>
      patchCampaignStatus(params.id, params.status),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: CAMPAIGNS_KEY });
      queryClient.invalidateQueries({ queryKey: [...CAMPAIGNS_KEY, variables.id] });
    },
  });
};