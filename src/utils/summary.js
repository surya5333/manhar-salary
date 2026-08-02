export function calculateSummary(processedEmployees) {
  return {
    employees: processedEmployees.length,

    grossSalary: processedEmployees.reduce(
  (sum, emp) => sum + (emp.grossSalary || 0),
  0
),

    commission: processedEmployees.reduce(
      (sum, emp) => sum + (emp.commission || 0),
      0
    ),

    teaCost: processedEmployees.reduce(
      (sum, emp) => sum + (emp.teaCost || 0),
      0
    ),

    boxCost: processedEmployees.reduce(
      (sum, emp) => sum + (emp.boxCost || 0),
      0
    ),

    leaveDeduction: processedEmployees.reduce(
      (sum, emp) => sum + (emp.leaveDeduction || 0),
      0
    ),

    netPayroll: processedEmployees.reduce(
      (sum, emp) => sum + (emp.finalSalary || 0),
      0
    ),
  };
}