import {
    CampaignForm,
    type CampaignFormState,
} from "@/components/common/campaign-form";
import { Button } from "@/components/ui/button";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useCampaign, useUpdateCampaign, type CampaignInput } from "@/hooks/use-campaigns";
import { ArrowLeft } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const statusOptions = ["active", "paused", "finished"];

const toDateInput = (value?: string) => {
  if (!value) return "";
  const normalized = value.includes("T") ? value.split("T")[0] : value;
  return normalized;
};

const EditPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: campaign, isLoading } = useCampaign(id || undefined);
  const { mutateAsync, isPending, isSuccess, isError, error } = useUpdateCampaign();

  const [form, setForm] = useState<CampaignFormState>({
    name: "",
    status: "paused",
    advertiser: "",
    startDate: "",
    endDate: "",
    budget: "",
    impressions: "",
    clicks: "",
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!campaign) return;
    setForm({
      name: String(campaign.name ?? ""),
      status: String(campaign.status ?? "paused"),
      advertiser: String(campaign.advertiser ?? ""),
      startDate: toDateInput(String(campaign.startDate ?? "")),
      endDate: toDateInput(String(campaign.endDate ?? "")),
      budget: campaign.budget ? String(campaign.budget) : "",
      impressions: campaign.impressions ? String(campaign.impressions) : "",
      clicks: campaign.clicks ? String(campaign.clicks) : "",
    });
  }, [campaign]);

  const errors = useMemo(() => {
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = "Le nom est requis";
    if (!form.advertiser.trim()) next.advertiser = "L'annonceur est requis";
    if (form.startDate && form.endDate && form.startDate > form.endDate) {
      next.endDate = "La date de fin doit être après la date de début";
    }
    return next;
  }, [form]);

  const isValid = Object.keys(errors).length === 0;

  const handleChange =
    (key: keyof CampaignFormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    };

  const handleStatusChange = (value: string) => {
    setForm((prev) => ({ ...prev, status: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({
      name: true,
      status: true,
      advertiser: true,
      startDate: true,
      endDate: true,
      budget: true,
      impressions: true,
      clicks: true,
    });
    if (!isValid || !id) return;

    const payload: CampaignInput = {
      name: form.name.trim(),
      status: form.status || undefined,
      advertiser: form.advertiser || undefined,
      startDate: form.startDate || undefined,
      endDate: form.endDate || undefined,
      budget: form.budget ? Number(form.budget) : undefined,
      impressions: form.impressions ? Number(form.impressions) : undefined,
      clicks: form.clicks ? Number(form.clicks) : undefined,
    };

    await mutateAsync({ id, payload });
    navigate("/")
  };

  if (isLoading) {
    return (
      <div className="mx-auto w-full max-w-2xl">
        <div className="space-y-5 p-6">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">Chargement...</CardTitle>
          </CardHeader>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="space-y-5 p-6">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => navigate(-1)}
              variant="outline"
              size="icon"
              className="px-2"
            >
              <ArrowLeft size={16} />
            </Button>
            <CardTitle className="text-xl font-semibold">
              Modifier la campagne
            </CardTitle>
          </div>
          <CardDescription>
            Mettez à jour les informations de la campagne.
          </CardDescription>
        </CardHeader>
        <CampaignForm
          form={form}
          errors={errors}
          touched={touched}
          statusOptions={statusOptions}
          isPending={isPending}
          isValid={isValid}
          isSuccess={isSuccess}
          isError={isError}
          errorMessage={error instanceof Error ? error.message : undefined}
          submitLabel="Enregistrer"
          submitPendingLabel="Mise à jour..."
          successMessage="Campagne mise à jour avec succès."
          onChange={handleChange}
          onStatusChange={handleStatusChange}
          onTouch={(key) => setTouched((prev) => ({ ...prev, [key]: true }))}
          onSubmit={handleSubmit}
          onReset={() => {
            if (!campaign) return;
            setForm({
              name: String(campaign.name ?? ""),
              status: String(campaign.status ?? "paused"),
              advertiser: String(campaign.advertiser ?? ""),
              startDate: toDateInput(String(campaign.startDate ?? "")),
              endDate: toDateInput(String(campaign.endDate ?? "")),
              budget: campaign.budget ? String(campaign.budget) : "",
              impressions: campaign.impressions ? String(campaign.impressions) : "",
              clicks: campaign.clicks ? String(campaign.clicks) : "",
            });
            setTouched({});
          }}
        />
      </div>
    </div>
  );
};

export default EditPage;
