import PageCard from "../components/ui/SectionCard";
import PageLayout from "../components/layout/PageLayout";
import { Users } from "lucide-react";

export default function Customers () {
  return <>
    <PageLayout title="Customers" icon={<Users size={20} className="opacity-80" />}>
      <PageCard title="Customers"><p>This is content body</p>
      </PageCard>
      <PageCard title="Customers"><p>This is content body</p>
      </PageCard>
      <PageCard title="Customers"><p>This is content body</p>
      </PageCard>
      <PageCard title="Customers"><p>This is content body</p>
      </PageCard>
      <PageCard title="Customers"><p>This is content body</p>
      </PageCard>
      <PageCard title="Customers"><p>This is content body</p>
      </PageCard>
      <PageCard title="Customers"><p>This is content body</p>
      </PageCard>
      <PageCard title="Customers"><p>This is content body</p>
      </PageCard>
      <PageCard title="Customers"><p>This is content body</p>
      </PageCard>
      <PageCard title="Customers"><p>This is content body</p>
      </PageCard>
      <PageCard title="Customers"><p>This is content body</p>
      </PageCard>
      <PageCard title="Customers"><p>This is content body</p>
      </PageCard>
    </PageLayout>
  </>
};