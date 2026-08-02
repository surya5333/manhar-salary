import { Card } from "@/components/ui/card";
import {
  Users,
  Wallet,
  BadgeIndianRupee,
  Coffee,
  UtensilsCrossed,
  CircleDollarSign,
} from "lucide-react";

export default function SummaryCards({ summary }) {
  const cards = [
    {
      title: "Employees",
      value: summary.employees,
      icon: Users,
    },
    {
      title: "Gross Salary",
      value: `₹${summary.grossSalary}`,
      icon: Wallet,
    },
    {
      title: "Commission",
      value: `₹${summary.commission}`,
      icon: BadgeIndianRupee,
    },
    {
      title: "Tea Cost",
      value: `₹${summary.teaCost}`,
      icon: Coffee,
    },
    {
      title: "Box Cost",
      value: `₹${summary.boxCost}`,
      icon: UtensilsCrossed,
    },
    {
      title: "Net Payroll",
      value: `₹${summary.netPayroll}`,
      icon: CircleDollarSign,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;

        return (
          <Card
            key={card.title}
            className="p-5 shadow-sm hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {card.title}
              </p>

              <Icon
                size={20}
                className="text-emerald-600"
              />
            </div>

            <h2 className="mt-4 text-2xl font-bold">
              {card.value}
            </h2>
          </Card>
        );
      })}
    </div>
  );
}