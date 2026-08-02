import * as XLSX from "xlsx";
import { getMonthDetails } from "@/utils/calendar";

export const downloadTemplate = (settings) => {
  const { maximumWorkingDays } = getMonthDetails(
    settings.month,
    settings.year
  );

  const data = [
    {
      "Employee ID": "",
      "Employee Name": "",
      "Monthly Salary": "",
      "Working Days": maximumWorkingDays,
      "Extra Days": 0,
      "Leaves Taken": 0,
      "Commission": 0,
    },
  ];

  const worksheet = XLSX.utils.json_to_sheet(data);

  worksheet["!cols"] = [
    { wch: 15 },
    { wch: 25 },
    { wch: 18 },
    { wch: 15 },
    { wch: 12 },
    { wch: 15 },
    { wch: 15 },
  ];

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Employees"
  );

  XLSX.writeFile(
    workbook,
    `MANHAR-Payroll-Template-${settings.year}-${settings.month + 1}.xlsx`
  );
};