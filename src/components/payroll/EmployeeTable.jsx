import { useMemo, useState } from "react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Download, Search } from "lucide-react";

import { exportPayroll } from "@/utils/exportExcel";
import { formatCurrency } from "@/utils/format";

export default function EmployeeTable({
  employees,
  settings,
}) {
  const [search, setSearch] = useState("");

  const filteredEmployees = useMemo(() => {
    const keyword = search.toLowerCase();

    return employees.filter((emp) => {
      return (
        emp.name.toLowerCase().includes(keyword) ||
        emp.id.toLowerCase().includes(keyword)
      );
    });
  }, [employees, search]);

  return (
    <Card className="p-6 shadow-sm">

      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 mb-6">

        <div>
          <h2 className="text-2xl font-bold">
            Employee Payroll
          </h2>

          <p className="text-gray-500">
            Showing {filteredEmployees.length} employee(s)
          </p>
        </div>

        <div className="flex gap-3">

          <div className="relative">

            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <Input
              placeholder="Search Employee..."
              className="pl-10 w-64"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

          <Button
            onClick={() =>
              exportPayroll(
                filteredEmployees,
                settings
              )
            }
            disabled={!filteredEmployees.length}
          >
            <Download className="mr-2 h-4 w-4" />
            Export Excel
          </Button>

        </div>

      </div>

      <div className="overflow-auto rounded-lg border">

        <Table>

          <TableHeader>

            <TableRow>

              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Monthly Salary</TableHead>
              <TableHead>Daily Salary</TableHead>
              <TableHead>Working Days</TableHead>
              <TableHead>Weekly Off</TableHead>
              <TableHead>Attendance</TableHead>
              <TableHead>Casual Leave</TableHead>
              <TableHead>Leaves Taken</TableHead>
              <TableHead>Bonus</TableHead>
              <TableHead>Weekly Off Pay</TableHead>
              <TableHead>Tea</TableHead>
              <TableHead>Lunch Box</TableHead>
              <TableHead>Commission</TableHead>
              <TableHead>Leave Deduction</TableHead>
              <TableHead>Gross Salary</TableHead>
              <TableHead className="text-right">
                Final Salary
              </TableHead>

            </TableRow>

          </TableHeader>

          <TableBody>

            {filteredEmployees.length === 0 ? (

              <TableRow>

                <TableCell
                  colSpan={17}
                  className="text-center py-10"
                >
                  No employee uploaded.
                </TableCell>

              </TableRow>

            ) : (

              filteredEmployees.map((emp) => (

                <TableRow key={emp.id}>

                  <TableCell>{emp.id}</TableCell>

                  <TableCell className="font-medium">
                    {emp.name}
                  </TableCell>

                  <TableCell>
                    {formatCurrency(emp.monthlySalary)}
                  </TableCell>

                  <TableCell>
                    {formatCurrency(emp.dailySalary)}
                  </TableCell>

                  <TableCell>
                    {emp.workingDays}
                  </TableCell>

                  <TableCell>
                    {emp.weeklyOff}
                  </TableCell>

                  <TableCell>
                    {emp.totalAttendance}
                  </TableCell>

                  <TableCell>
                    {emp.allowedLeaves}
                  </TableCell>

                  <TableCell>
                    {emp.leavesTaken}
                  </TableCell>

                  <TableCell className="text-green-600 font-semibold">
                    {formatCurrency(emp.bonus)}
                  </TableCell>

                  <TableCell className="text-green-600 font-semibold">
                    {formatCurrency(emp.weeklyOffPay)}
                  </TableCell>

                  <TableCell className="text-green-600 font-semibold">
                    {formatCurrency(emp.teaCost)}
                  </TableCell>

                  <TableCell className="text-green-600 font-semibold">
                    {formatCurrency(emp.lunchBoxCost)}
                  </TableCell>

                  <TableCell className="text-blue-600 font-semibold">
                    {formatCurrency(emp.commission)}
                  </TableCell>

                  <TableCell className="text-red-600 font-semibold">
                    {formatCurrency(emp.leaveDeduction)}
                  </TableCell>

                  <TableCell className="font-semibold">
                    {formatCurrency(emp.grossSalary)}
                  </TableCell>

                  <TableCell className="text-right font-bold text-emerald-700">
                    {formatCurrency(emp.finalSalary)}
                  </TableCell>

                </TableRow>

              ))

            )}

          </TableBody>

        </Table>

      </div>

    </Card>
  );
}