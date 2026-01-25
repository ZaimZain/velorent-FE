import PageCard from "../components/ui/SectionCard";
import PageLayout from "../components/layout/PageLayout";
import { Car } from "lucide-react";

export default function CarFleet () {
  return <>
    <PageLayout title="CarFleet" icon={<Car size={20} className="opacity-80" />}>
      <PageCard title="CarFleet"><p>This is content body</p>
      </PageCard>
    </PageLayout>
  </>
};