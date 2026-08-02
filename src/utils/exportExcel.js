import * as XLSX from "xlsx";

const MONTHS = [
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

export function exportPayroll(employees, settings) {
  if (!employees.length) {
    alert("No employee data available.");
    return;
  }

  const data = employees.map((emp) => ({
    "Employee ID": emp.id,
    "Employee Name": emp.name,

    "Monthly Salary": emp.monthlySalary,
    "Daily Salary": emp.dailySalary,

    "Working Days": emp.workingDays,
    "Weekly Off": emp.weeklyOff,
    "Total Attendance": emp.totalAttendance,

    "Casual Leave": emp.allowedLeaves,
    "Casual Leave Pay": emp.casualLeavePay,

    "Leaves Taken": emp.leavesTaken,
    "Remaining Leaves": emp.remainingLeaves,
    "Extra Leaves": emp.extraLeaves,

    Bonus: emp.bonus,

    "Weekly Off Pay": emp.weeklyOffPay,

    "Tea Amount": emp.teaCost,

    "Lunch Box Allowed": emp.lunchBoxAllowed
      ? "YES"
      : "NO",

    "Lunch Box Amount": emp.lunchBoxCost,

    "Total Additions": emp.additions,

    Commission: emp.commission,

    "Gross Salary": emp.grossSalary,

    "Leave Deduction": emp.leaveDeduction,

    "Final Salary": emp.finalSalary,
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);

  worksheet["!cols"] = [
    { wch: 15 }, // Employee ID
    { wch: 25 }, // Employee Name
    { wch: 18 }, // Monthly Salary
    { wch: 15 }, // Daily Salary
    { wch: 15 }, // Working Days
    { wch: 15 }, // Weekly Off
    { wch: 18 }, // Attendance
    { wch: 15 }, // Casual Leave
    { wch: 18 }, // Casual Leave Pay
    { wch: 15 }, // Leaves Taken
    { wch: 18 }, // Remaining Leaves
    { wch: 15 }, // Extra Leaves
    { wch: 15 }, // Bonus
    { wch: 18 }, // Weekly Off Pay
    { wch: 15 }, // Tea
    { wch: 20 }, // Lunch Box Allowed
    { wch: 18 }, // Lunch Box Amount
    { wch: 18 }, // Total Additions
    { wch: 15 }, // Commission
    { wch: 18 }, // Gross Salary
    { wch: 18 }, // Leave Deduction
    { wch: 18 }, // Final Salary
  ];

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Payroll"
  );

  const fileName = settings
    ? `MANHAR-Payroll-${
        MONTHS[settings.month]
      }-${settings.year}.xlsx`
    : "MANHAR-Payroll.xlsx";

  XLSX.writeFile(workbook, fileName);
}