import { Card } from "@/components/ui/card";
import {
  Users,
  Wallet,
  CalendarCheck,
  Gift,
  BadgeIndianRupee,
  Coffee,
  UtensilsCrossed,
  CircleDollarSign,
} from "lucide-react";

import { formatCurrency } from "@/utils/format";

export default function SummaryCards({ summary }) {
  const cards = [
    {
      title: "Employees",
      value: summary.employees,
      icon: Users,
    },
    {
      title: "Gross Salary",
      value: formatCurrency(summary.grossSalary),
      icon: Wallet,
    },
    {
      title: "Casual Leave Pay",
      value: formatCurrency(summary.casualLeavePay),
      icon: CalendarCheck,
    },
    {
      title: "Bonus",
      value: formatCurrency(summary.bonus),
      icon: Gift,
    },
    {
      title: "Commission",
      value: formatCurrency(summary.commission),
      icon: BadgeIndianRupee,
    },
    {
      title: "Tea",
      value: formatCurrency(summary.teaCost),
      icon: Coffee,
    },
    {
      title: "Lunch Box",
      value: formatCurrency(summary.lunchBoxCost),
      icon: UtensilsCrossed,
    },
    {
      title: "Net Payroll",
      value: formatCurrency(summary.netPayroll),
      icon: CircleDollarSign,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-4">
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