import PageCard from "../components/ui/SectionCard";
import PageLayout from "../components/layout/PageLayout";
import { Bell } from "lucide-react";

export default function NotificationPage() {
  return <>
    <PageLayout title="Notifications" icon={<Bell size={20} className="opacity-80" />}>
      <PageCard title="Notifications"><p>This is content body</p>
      </PageCard>
    </PageLayout>
  </>
};