import { calculatePayroll } from "./payroll";

export function processPayroll(
  employees,
  settings
) {
  return employees.map((employee) =>
    calculatePayroll(employee, settings)
  );
}