import PageCard from "../components/ui/SectionCard";
import PageLayout from "../components/layout/PageLayout";
import { ClipboardList } from "lucide-react";

export default function RentalStatus () {
  return <>
    <PageLayout title="RentalStatus" icon={<ClipboardList size={20} className="opacity-80" />}>
      <PageCard title="RentalStatus"><p>This is content body</p>
      </PageCard>
    </PageLayout>
  </>
};