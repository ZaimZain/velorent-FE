/**
 * PageHeader handles:
 * 1) title + description (always)
 * 2) optional toolbar row (search/filter/add), used by list pages
 */
interface PageHeaderProps {
  title: string;
  description?: string;

  /**
   * If provided, shows a toolbar row under the title/description.
   * Use this for CarFleet / RentalStatus / Customers pages.
   */
  toolbar?: React.ReactNode;
}

export default function PageHeader({ title, description, toolbar }: PageHeaderProps) {
  return (
    <div className="mb-6">
      {/* Title + Description */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">{title}</h1>
          {description ? (
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          ) : null}
        </div>
      </div>

      {/* Optional toolbar row (search/filter/add) */}
      {toolbar ? <div className="mt-4">{toolbar}</div> : null}
    </div>
  );
}
