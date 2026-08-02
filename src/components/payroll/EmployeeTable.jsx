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

import {
  Download,
  Search,
} from "lucide-react";

import { exportPayroll } from "@/utils/exportExcel";
import { formatCurrency } from "@/utils/format";

export default function EmployeeTable({ employees }) {
  const [search, setSearch] = useState("");

  const filteredEmployees = useMemo(() => {
    return employees.filter((emp) => {
      const keyword = search.toLowerCase();

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
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>

          <Button
            onClick={() => exportPayroll(filteredEmployees)}
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

              <TableHead>Extra Days</TableHead>

              <TableHead>Total Attendance</TableHead>

              <TableHead>Extra Pay</TableHead>

              <TableHead>Tea Cost</TableHead>

              <TableHead>Box Cost</TableHead>

              <TableHead>Leave Deduction</TableHead>

              <TableHead>Commission</TableHead>

              <TableHead>Gross Salary</TableHead>

              <TableHead>Total Deductions</TableHead>

              <TableHead className="text-right">
                Final Salary
              </TableHead>

            </TableRow>

          </TableHeader>

          <TableBody>

            {filteredEmployees.length === 0 ? (

              <TableRow>

                <TableCell
                  colSpan={15}
                  className="text-center py-12"
                >
                  No employee uploaded.
                </TableCell>

              </TableRow>

            ) : (

              filteredEmployees.map((emp) => (

                <TableRow key={emp.id}>

                  <TableCell>
                    {emp.id}
                  </TableCell>

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
                    {emp.extraDays}
                  </TableCell>

                  <TableCell>
                    {emp.totalAttendance}
                  </TableCell>

                  <TableCell className="text-green-600 font-medium">
                    {formatCurrency(emp.extraPay)}
                  </TableCell>

                  <TableCell className="text-green-600">
                    {formatCurrency(emp.teaCost)}
                  </TableCell>

                  <TableCell className="text-green-600">
                    {formatCurrency(emp.boxCost)}
                  </TableCell>

                  <TableCell className="text-red-600">
                    {formatCurrency(emp.leaveDeduction)}
                  </TableCell>

                  <TableCell className="text-blue-600">
                    {formatCurrency(emp.commission)}
                  </TableCell>

                  <TableCell className="font-semibold">
                    {formatCurrency(emp.grossSalary)}
                  </TableCell>

                  <TableCell className="text-red-600 font-semibold">
                    {formatCurrency(emp.deductions)}
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