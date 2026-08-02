// Round to nearest rupee
const round = (value) => Math.round(value);

// Monthly Salary / 30
export function calculateDailySalary(monthlySalary) {
  return round(monthlySalary / 30);
}

// Weekly Off Pay
export function calculateWeeklyOffPay(
  dailySalary,
  weeklyOff
) {
  return round(dailySalary * weeklyOff);
}

// Tea Cost
export function calculateTeaCost(
  totalAttendance,
  teaRate
) {
  return round(totalAttendance * teaRate);
}

// Lunch Box Cost
export function calculateLunchBoxCost(
  totalAttendance,
  boxRate
) {
  return round(totalAttendance * boxRate);
}

// Leave Bonus & Deduction
export function calculateLeaveAdjustment(
  dailySalary,
  leavesTaken,
  allowedLeaves
) {
  // Penalty Rule
  if (leavesTaken >= 6) {
    return {
      bonus: 0,
      leaveDeduction: round(
        leavesTaken * dailySalary
      ),
      extraLeaves: leavesTaken,
      remainingLeaves: 0,
    };
  }

  // Bonus
  if (leavesTaken < allowedLeaves) {
    const remainingLeaves =
      allowedLeaves - leavesTaken;

    return {
      bonus: round(
        remainingLeaves * dailySalary
      ),
      leaveDeduction: 0,
      extraLeaves: 0,
      remainingLeaves,
    };
  }

  // Equal
  if (leavesTaken === allowedLeaves) {
    return {
      bonus: 0,
      leaveDeduction: 0,
      extraLeaves: 0,
      remainingLeaves: 0,
    };
  }

  // Normal deduction
  const extraLeaves =
    leavesTaken - allowedLeaves;

  return {
    bonus: 0,
    leaveDeduction: round(
      extraLeaves * dailySalary
    ),
    extraLeaves,
    remainingLeaves: 0,
  };
}

// Main Payroll Function
export function calculatePayroll(
  employee,
  settings
) {
  const dailySalary =
    calculateDailySalary(employee.monthlySalary);

  const totalAttendance =
    employee.workingDays +
    employee.weeklyOff;

  const weeklyOffPay =
    calculateWeeklyOffPay(
      dailySalary,
      employee.weeklyOff
    );

  const teaCost =
    calculateTeaCost(
      totalAttendance,
      settings.teaCost
    );

  const lunchBoxCost =
    employee.lunchBoxAllowed
      ? calculateLunchBoxCost(
          totalAttendance,
          settings.boxCost
        )
      : 0;

  const {
    bonus,
    leaveDeduction,
    extraLeaves,
    remainingLeaves,
  } = calculateLeaveAdjustment(
    dailySalary,
    employee.leavesTaken,
    settings.allowedLeaves
  );

  // Casual Leave Rule
  const casualLeaves =
    employee.leavesTaken >= 6
      ? 0
      : settings.allowedLeaves;

  // Casual Leave Pay Rule
  const casualLeavePay =
    employee.leavesTaken >= 6
      ? 0
      : round(
          casualLeaves *
            dailySalary
        );

  const grossSalary =
    employee.monthlySalary +
    casualLeavePay +
    weeklyOffPay +
    bonus +
    employee.commission;

  // Tea & Lunch Box are additions
  const additions =
    teaCost +
    lunchBoxCost;

  // Only Leave Deduction
  const deductions =
    leaveDeduction;

  const finalSalary =
    grossSalary +
    additions -
    deductions;

  return {
    ...employee,

    dailySalary,

    totalAttendance,

    allowedLeaves: casualLeaves,

    casualLeavePay,

    weeklyOffPay,

    bonus,

    extraLeaves,

    remainingLeaves,

    teaCost,

    lunchBoxCost,

    additions,

    leaveDeduction,

    deductions,

    grossSalary,

    finalSalary: round(finalSalary),
  };
}