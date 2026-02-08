import Pill from "../ui/Pill";
import { Car, UserRound } from "lucide-react";

type Props = {
  carName: string;
  customerName: string;
  start: string;
  end: string;
  status: "ACTIVE" | "UPCOMING";
};

export default function RentalMiniRow({ carName, customerName, start, end, status }: Props) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3">
      <div className="flex items-center gap-3">
        <Car size={16} className="text-muted-foreground" />
        <div className="font-semibold">{carName}</div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <UserRound size={14} />
          {customerName}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-sm text-muted-foreground">
          {start} – {end}
        </div>
        {status === "ACTIVE" ? <Pill variant="active">active</Pill> : <Pill variant="upcoming">upcoming</Pill>}
      </div>
    </div>
  );
}
