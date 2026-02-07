import { formatCurrency, formatDate } from "@/helpers/utils";
import { cn } from "@/lib/utils";
import {
  CirclePause,
  CirclePlay,
  Edit,
  EllipsisVertical,
  FileBox,
  Trash,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

type Props = {
  campaigns: Campaign[];
  isLoading?: boolean;
  isError?: boolean;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
  onViewDetails?: (id: string) => void;
  onActivate?: (id: string, status: string) => void;
};

export default function CampaignTable({
  campaigns,
  isLoading,
  isError,
  onEdit,
  onDelete,
  onViewDetails,
  onActivate,
}: Props) {
  const classTh = "px-4 py-3 text-left text-sm font-medium text-gray-700";
  const classTd = "px-4 py-3 text-sm text-gray-700";
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className={classTh}>Nom campagne</th>
            <th className={classTh}>Statut</th>
            <th className={classTh + " text-right"}>Budget</th>
            <th className={classTh + " text-right"}>Date debut</th>
            <th className={classTh + " text-right"}>Impressions</th>
            <th className={classTh + " text-right"}>Clicks</th>
            <th className={classTh + " text-right"}>Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {isLoading ? (
            <tr className="bg-white">
              <td colSpan={7} className="p-3 text-center text-gray-500">
                Chargement...
              </td>
            </tr>
          ) : isError ? (
            <tr className="bg-white">
              <td colSpan={7} className="p-3 text-center text-red-500">
                Une erreur est survenue.
              </td>
            </tr>
          ) : campaigns?.length === 0 ? (
            <tr className="bg-white">
              <td colSpan={7} className="p-3 text-center text-gray-500">
                Aucune campagne trouvée.
              </td>
            </tr>
          ) : (
            campaigns?.map((c) => (
              <tr key={c._id}>
                <td className={classTd}>{c.name}</td>
                <td className={classTd}>
                  <Badge
                    variant={c.status == "paused" ? "destructive" : "outline"}
                    className="rounded-full items-center"
                  >
                    <span
                      className={cn(
                        c.status == "paused" ? "bg-destructive" : "bg-primary",
                        "rounded-full size-1.5 ",
                      )}
                      aria-hidden="true"
                    />
                    {c.status}
                  </Badge>
                </td>
                <td className={classTd + " text-right"}>
                  {formatCurrency(c.budget, "EUR")}
                </td>
                <td className={classTd + " text-right"}>
                  {formatDate(c.startDate, "dd MMM yyyy")}
                </td>
                <td className={classTd + " text-right"}>{c.impressions}</td>
                <td className={classTd + " text-right"}>{c.clicks}</td>
                <td className={classTd + " text-right"}>
                  <div className="inline-flex gap-2">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant={"outline"} size={"icon-sm"}>
                          <EllipsisVertical size={16} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        className="rounded-lg w-40"
                        side={"bottom"}
                        align={"center"}
                      >
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => onViewDetails?.(c._id)}
                        >
                          <FileBox size={16} />
                          <span>Voir details</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => onEdit?.(c._id)}>
                          <Edit size={16} />
                          <span>Modifier</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => onActivate?.(c._id, c.status)}
                        >
                          {c.status === "active" ? (
                            <CirclePause size={16} />
                          ) : (
                            <CirclePlay size={16} />
                          )}
                          <span>
                            {c.status === "active"
                              ? "Mettre en pause"
                              : "Activer"}
                          </span>
                        </DropdownMenuItem>
                        {/* <DropdownMenuItem
                          onClick={() => onDelete?.(c._id)}
                          variant="destructive"
                        >
                          <Trash size={16} />
                          <span>Supprimer</span>
                        </DropdownMenuItem> */}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
