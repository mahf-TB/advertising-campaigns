import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency, formatDate } from "@/helpers/utils";
import { useCampaignWithStats } from "@/hooks/use-campaigns";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const DetailPage = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: campaign } = useCampaignWithStats(id || undefined);
  return (
    <div className="mx-auto w-full max-w-4xl mt-5">
      <div className="space-y-6 px-4 pb-8">
        <div className="flex flex-col gap-2">
          <div className="text-3xl font-semibold text-gray-900 dark:text-gray-100">
            <Button
              onClick={() => {
                navigate(-1);
              }}
              variant="ghost"
              size={"icon"}
              className="px-2"
            >
              <ArrowLeft size={16} />
            </Button>
            {campaign?.name || "Détails de la campagne"}
          </div>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <Badge
              variant={
                campaign?.status === "paused" ? "destructive" : "outline"
              }
              className="rounded-full"
            >
              <span
                className={cn(
                  campaign?.status === "paused"
                    ? "bg-destructive"
                    : "bg-primary",
                  "mr-1.5 inline-block size-1.5 rounded-full",
                )}
                aria-hidden="true"
              />
              {campaign?.status || "statut"}
            </Badge> 
            <span className="text-muted-foreground">
              Crée le {campaign?.createdAt
                ? formatDate(campaign.createdAt, "dd MMM yyyy")
                : "—"}
            </span>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Budget
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xl font-semibold">
              {typeof campaign?.budget === "number"
                ? formatCurrency(campaign.budget, "EUR")
                : "—"}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Impressions
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xl font-semibold">
              {campaign?.impressions ?? "—"}
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Clicks
              </CardTitle>
            </CardHeader>
            <CardContent className="text-xl font-semibold">
              {campaign?.clicks ?? "—"}
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Informations de la campagne</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-muted-foreground">Annonceur</dt>
                <dd className="font-medium">{campaign?.advertiser || "—"}</dd>
              </div>
              <div>
                <dt className="text-muted-foreground">Période</dt>
                <dd className="font-medium">
                  {campaign?.startDate
                    ? formatDate(campaign.startDate, "dd MMM yyyy")
                    : "—"}
                  {campaign?.endDate
                    ? ` → ${formatDate(campaign.endDate, "dd MMM yyyy")}`
                    : ""}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">CTR</dt>
                <dd className="font-medium">
                  {campaign?.ctr ? campaign.ctr.toFixed(2) : "—"}
                </dd>
              </div>
              <div>
                <dt className="text-muted-foreground">CPC</dt>
                <dd className="font-medium">
                  {campaign?.cpc ? campaign.cpc.toFixed(2) : "—"}
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DetailPage;
