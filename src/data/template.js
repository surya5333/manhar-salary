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
      "Weekly Off": 0,
      "Leaves Taken": 0,
      "Commission": 0,
      "Lunch Box Allowed": "YES",
    },
  ];

  const worksheet = XLSX.utils.json_to_sheet(data);

  worksheet["!cols"] = [
    { wch: 15 },
    { wch: 25 },
    { wch: 18 },
    { wch: 15 },
    { wch: 15 },
    { wch: 15 },
    { wch: 15 },
    { wch: 20 },
  ];

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Employees"
  );

  const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

XLSX.writeFile(
  workbook,
  `MANHAR-Payroll-Template-${months[settings.month]}-${settings.year}.xlsx`
);
};