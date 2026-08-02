import { CalendarDays, Building2, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Header() {
  const now = new Date();

  const currentMonth = now.toLocaleString("default", {
    month: "long",
  });

  const currentYear = now.getFullYear();

  const today = now.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <header className="bg-white border-b shadow-sm">

      <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-5">

        <div className="flex items-center gap-4">

          <div className="w-14 h-14 rounded-xl bg-emerald-600 flex items-center justify-center">
            <Building2 className="text-white" size={30} />
          </div>

          <div>

            <h1 className="text-3xl font-bold text-emerald-700">
              MANHAR
            </h1>

            <p className="text-gray-500">
              Salary Processing System
            </p>

            <p className="text-sm text-gray-400 mt-1">
              Payroll for {currentMonth} {currentYear}
            </p>

          </div>

        </div>

        <div className="flex items-center gap-3 flex-wrap">

          <Badge
            variant="secondary"
            className="px-3 py-1 text-sm"
          >
            <CalendarDays className="mr-2 h-4 w-4" />
            {today}
          </Badge>

          <Badge
            className="bg-emerald-600 hover:bg-emerald-700 px-3 py-1 text-sm"
          >
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Ready
          </Badge>

        </div>

      </div>

    </header>
  );
}