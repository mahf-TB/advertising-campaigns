import { TeamSwitcher } from "@/components/common/team-switcher";
import { Airplay, GitCompareArrows } from "lucide-react";
import { type ReactElement } from "react";
const teams = [
  {
    name: "Amazon",
    logo: <GitCompareArrows size={18} />,
    plan: "Advertiser",
  },
];
const RootLayout = ({ children }: { children: ReactElement }) => {
  return (
    <div className="max-w-4xl mx-auto px-2">
      <div className="h-16 border-b border-border flex items-center justify-between">
        <span className="text-2xl font-black flex items-center gap-1"><Airplay  size={30} strokeWidth={3} /> AdTech</span>
        <TeamSwitcher teams={teams || []} className="py-1 max-w-40" />
      </div>
      <main>{children}</main>
    </div>
  );
};

export default RootLayout;
