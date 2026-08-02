import * as XLSX from "xlsx";

export function exportPayroll(employees) {
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
    "Extra Days": emp.extraDays,
    "Total Attendance": emp.totalAttendance,
    "Extra Pay": emp.extraPay,
    "Tea Cost": emp.teaCost,
    "Box Cost": emp.boxCost,
    "Leaves Taken": emp.leavesTaken,
    "Allowed Leaves": emp.allowedLeaves,
    "Extra Leaves": emp.extraLeaves,
    "Leave Deduction": emp.leaveDeduction,
    "Commission": emp.commission,
    "Gross Salary": emp.grossSalary,
    "Total Deductions": emp.deductions,
    "Final Salary": emp.finalSalary,
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);

  worksheet["!cols"] = [
    { wch: 15 },
    { wch: 25 },
    { wch: 18 },
    { wch: 15 },
    { wch: 15 },
    { wch: 12 },
    { wch: 18 },
    { wch: 15 },
    { wch: 12 },
    { wch: 12 },
    { wch: 15 },
    { wch: 15 },
    { wch: 15 },
    { wch: 18 },
    { wch: 15 },
    { wch: 18 },
    { wch: 18 },
    { wch: 18 },
  ];

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Payroll"
  );

  XLSX.writeFile(
    workbook,
    "MANHAR-Payroll.xlsx"
  );
}