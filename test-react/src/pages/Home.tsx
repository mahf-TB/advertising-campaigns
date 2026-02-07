import { PaginationUnderline } from "@/components/common/pagination-underline";
import { Button } from "@/components/ui/button";
import { useCampaigns, useDeleteCampaign, usePatchCampaignStatus } from "@/hooks/use-campaigns";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CampaignTable from "../components/common/campaign-table";
import { SelectField } from "@/components/app-ui/select-field";


const statusOptions = ["Toutes", "active", "paused", "finished"];

const Home = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState<"active" | "paused" | "finished" | 'Toutes'>('Toutes');
  const {
    data: campaigns,
    pagination,
    isLoading,
  } = useCampaigns({
    page: page,
    limit: 10,
    status: status === 'Toutes' ? undefined : status,
  });
  const { mutateAsync: patchStatus } = usePatchCampaignStatus();
  const { mutateAsync: deleteCampaign } = useDeleteCampaign();

  const handleDelete = (id: string) => {
    if (confirm(`Supprimer la campagne ${id} ?`)) {
      deleteCampaign(id)
    }
  };

  const handleActivate = async (id: string, status: string) => {
    const nextStatus = status === "active" ? "paused" : "active";
    await patchStatus({ id, status: nextStatus });
  };

  return (
    <div className="py-6">
      <div className="flex items-center justify-end mb-2">
        <h2 className=" text-2xl font-semibold sr-only">Campagnes</h2>
        <div className="flex items-center gap-2">

          <div className="w-40">
            <SelectField
              placeholder="Choisir un statut"
              value={status}
              onChange={(e) => setStatus(e as "active" | "paused" | "finished" | "Toutes")}
              options={statusOptions.map((status) => ({
                label: status,
                value: status,
              }))}
            />
          </div>
          <Button
            onClick={() => {
              navigate("/campains");
            }}
          >
            <Plus size={8} /> Nouvelle campagne
          </Button>
        </div>
      </div>
      <CampaignTable
        campaigns={campaigns?.items || []}
        isLoading={isLoading}
        isError={false}
        onEdit={(id) => {
          navigate(`/campains/${id}/edit`);
        }}
        onDelete={handleDelete}
        onViewDetails={(id) => {
          navigate(`/campains/${id}`);
        }}
        onActivate={handleActivate}
      />
      <div className="border-x border-b border-gray-200 rounded-lg overflow-hidden  py-4">
        <PaginationUnderline
          page={page}
          total={pagination.total}
          limit={pagination.limit}
          onPageChange={(page) => {
            setPage(page);
          }}
        />
      </div>
    </div>
  );
};

export default Home;
