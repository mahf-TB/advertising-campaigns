import { TeamSwitcher } from "@/components/team-switcher";
import { GitCompareArrows } from "lucide-react";
import { type ReactElement } from "react";
const teams = [
  {
    name: "Amazon",
    logo: <GitCompareArrows size={18} />,
    plan: "Announceur",
  },
];
const RootLayout = ({ children }: { children: ReactElement }) => {
  return (
    <div className="max-w-4xl mx-auto px-2">
      <div className="h-16 border-b border-border flex items-center justify-between">
        <span>Ad</span>
        <TeamSwitcher teams={teams || []} className="py-1" />
      </div>
      <main>{children}</main>
    </div>
  );
};

export default RootLayout;
