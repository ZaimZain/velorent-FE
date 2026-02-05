import PageCard from "../components/ui/SectionCard";
import PageLayout from "../components/layout/PageLayout";
import { CalendarDays } from "lucide-react";

export default function Calendar () {
  return <>
    <PageLayout title="Calendar" icon={<CalendarDays size={20} className="opacity-80" />}>
      <PageCard title="Calendar"><p>This is content body</p>
      </PageCard>
    </PageLayout>
  </>
};
