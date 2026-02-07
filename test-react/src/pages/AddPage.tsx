import {
  CampaignForm,
  type CampaignFormState,
} from "@/components/common/campaign-form";
import { Button } from "@/components/ui/button";
import { CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useCreateCampaign, type CampaignInput } from "@/hooks/use-campaigns";
import { ArrowLeft } from "lucide-react";
import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const initialForm: CampaignFormState = {
  name: "",
  status: "paused",
  advertiser: "",
  startDate: "",
  endDate: "",
  budget: "",
  impressions: "",
  clicks: "",
};

const statusOptions = ["active", "paused", "finished"];

const AddPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<CampaignFormState>(initialForm);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const { mutateAsync, isPending, isSuccess, isError, error } =
    useCreateCampaign();

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
    if (!isValid) return;

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

    await mutateAsync(payload);
    setForm(initialForm);
    setTouched({});
    navigate("/");
  };

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="space-y-5 p-6">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Button
              onClick={() => {
                navigate(-1);
              }}
              variant="outline"
              size={"icon"}
              className="px-2"
            >
              <ArrowLeft size={16} />
            </Button>
            <CardTitle className="text-xl font-semibold">
              Ajouter une campagne
            </CardTitle>
          </div>
          <CardDescription>
            Créez une nouvelle campagne avec ses paramètres principaux.
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
          onChange={handleChange}
          onStatusChange={handleStatusChange}
          onTouch={(key) => setTouched((prev) => ({ ...prev, [key]: true }))}
          onSubmit={handleSubmit}
          onReset={() => {
            setForm(initialForm);
            setTouched({});
          }}
        />
      </div>
    </div>
  );
};

export default AddPage;
