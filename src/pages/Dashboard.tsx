import PageLayout from "../components/layout/PageLayout";
import { LayoutDashboard } from "lucide-react";

export default function Dashboard() {
  return (
    <PageLayout title="Dashboard" icon={<LayoutDashboard size={20} className="opacity-80" />}>
      <div className="text-sm text-muted-foreground">
        Main content later (we’re focusing on sidebar/topbar now).
      </div>
    </PageLayout>
  );
}
