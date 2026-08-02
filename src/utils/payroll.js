// Round to nearest rupee
const round = (value) => Math.round(value);

// Monthly Salary / 30
export function calculateDailySalary(monthlySalary) {
  return round(monthlySalary / 30);
}

// Extra Days × Daily Salary
export function calculateExtraPay(
  dailySalary,
  extraDays
) {
  return round(dailySalary * extraDays);
}

// Tea Cost
export function calculateTeaCost(
  totalAttendance,
  teaRate
) {
  return round(totalAttendance * teaRate);
}

// Box Cost
export function calculateBoxCost(
  totalAttendance,
  boxRate
) {
  return round(totalAttendance * boxRate);
}

// Leave Deduction
export function calculateLeaveDeduction(
  dailySalary,
  leavesTaken,
  allowedLeaves
) {
  const extraLeaves = Math.max(
    0,
    leavesTaken - allowedLeaves
  );

  return {
    extraLeaves,
    leaveDeduction: round(extraLeaves * dailySalary),
  };
}

// Main Payroll Function
export function calculatePayroll(
  employee,
  settings
) {
  const dailySalary = calculateDailySalary(
    employee.monthlySalary
  );

  // Attendance is used only for Tea & Box
  const totalAttendance =
    employee.workingDays +
    employee.extraDays;

  const extraPay = calculateExtraPay(
    dailySalary,
    employee.extraDays
  );

  const teaCost = calculateTeaCost(
    totalAttendance,
    settings.teaCost
  );

  const boxCost = calculateBoxCost(
    totalAttendance,
    settings.boxCost
  );

  const { extraLeaves, leaveDeduction } =
    calculateLeaveDeduction(
      dailySalary,
      employee.leavesTaken,
      settings.allowedLeaves
    );

  // Gross Salary starts with Monthly Salary
  const grossSalary =
    employee.monthlySalary +
    extraPay +
    employee.commission;

  // Total Deductions
  const deductions =
    leaveDeduction;

  // Final Salary
  const finalSalary =
    grossSalary+
    teaCost +
    boxCost - deductions;

  return {
    ...employee,

    dailySalary,

    totalAttendance,

    extraLeaves,

    extraPay,

    teaCost,

    boxCost,

    leaveDeduction,

    grossSalary,

    deductions,

    finalSalary: round(finalSalary),
  };
}