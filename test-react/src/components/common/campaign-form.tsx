import { InputField } from "@/components/app-ui/input-field";
import { SelectField } from "@/components/app-ui/select-field";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import React from "react";

export type CampaignFormState = {
  name: string;
  status: string;
  advertiser: string;
  startDate: string;
  endDate: string;
  budget: string;
  impressions: string;
  clicks: string;
};

export type CampaignFormErrors = Record<string, string>;

type CampaignFormProps = {
  form: CampaignFormState;
  errors: CampaignFormErrors;
  touched: Record<string, boolean>;
  statusOptions: string[];
  isPending?: boolean;
  isValid?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
  errorMessage?: string;
  submitLabel?: string;
  submitPendingLabel?: string;
  resetLabel?: string;
  successMessage?: string;
  onChange: (
    key: keyof CampaignFormState,
  ) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onStatusChange: (value: string) => void;
  onTouch: (key: keyof CampaignFormState) => void;
  onSubmit: (e: React.FormEvent) => void;
  onReset: () => void;
};

export const CampaignForm = ({
  form,
  errors,
  touched,
  statusOptions,
  isPending,
  isValid,
  isSuccess,
  isError,
  errorMessage,
  submitLabel = "Créer",
  submitPendingLabel = "Création...",
  resetLabel = "Réinitialiser",
  successMessage = "Campagne créée avec succès.",
  onChange,
  onStatusChange,
  onTouch,
  onSubmit,
  onReset,
}: CampaignFormProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <CardContent className="grid gap-5 ">
        <InputField
          id="name"
          label="Nom"
          value={form.name}
          placeholder="Ex: Lancement produit Q2"
          onChange={onChange("name")}
          onBlur={() => onTouch("name")}
          error={errors.name}
          touched={touched.name}
        />
        <InputField
          id="advertiser"
          label="Annonceur"
          value={form.advertiser}
          placeholder="Ex: Nom de l'annonceur"
          onChange={onChange("advertiser")}
          onBlur={() => onTouch("advertiser")}
          error={errors.advertiser}
          touched={touched.advertiser}
        />

        <div className="grid gap-2">
          <SelectField
            label="Statut"
            placeholder="Choisir un statut"
            value={form.status}
            onChange={onStatusChange}
            options={statusOptions.map((status) => ({
              label: status,
              value: status,
            }))}
          />
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 items-start">
          <InputField
            id="startDate"
            label="Date de début"
            type="date"
            value={form.startDate}
            onChange={onChange("startDate")}
          />
          <InputField
            id="endDate"
            label="Date de fin"
            type="date"
            value={form.endDate}
            onChange={onChange("endDate")}
            onBlur={() => onTouch("endDate")}
            error={errors.endDate}
            touched={touched.endDate}
          />
        </div>

        <InputField
          id="budget"
          label="Budget"
          type="number"
          min={0}
          value={form.budget}
          onChange={onChange("budget")}
          placeholder="Ex: 5000"
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <InputField
            id="impressions"
            label="Impressions"
            type="number"
            min={0}
            value={form.impressions}
            onChange={onChange("impressions")}
            placeholder="Ex: 5000"
          />
          <InputField
            id="clicks"
            label="Clicks"
            type="number"
            min={0}
            value={form.clicks}
            onChange={onChange("clicks")}
            placeholder="Ex: 10000"
          />
        </div>

        {isError && (
          <p className="text-destructive text-sm">
            {errorMessage || "Erreur lors de la création"}
          </p>
        )}
        {isSuccess && (
          <p className="text-emerald-600 text-sm">
            {successMessage}
          </p>
        )}
      </CardContent>
      <CardFooter className="justify-end gap-3">
        <Button type="button" variant="outline" onClick={onReset}>
          {resetLabel}
        </Button>
        <Button type="submit" className="px-5" disabled={isPending || !isValid}>
          {isPending ? submitPendingLabel : submitLabel}
        </Button>
      </CardFooter>
    </form>
  );
};
