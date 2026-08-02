const REQUIRED_COLUMNS = [
  "Employee ID",
  "Employee Name",
  "Monthly Salary",
  "Working Days",
  "Extra Days",
  "Leaves Taken",
  "Commission",
];

export function validateExcel(data) {
  if (!data || data.length === 0) {
    return {
      valid: false,
      message: "Uploaded file is empty.",
    };
  }

  const columns = Object.keys(data[0]);

  const missing = REQUIRED_COLUMNS.filter(
    (col) => !columns.includes(col)
  );

  if (missing.length) {
    return {
      valid: false,
      message: `Missing Columns:\n${missing.join("\n")}`,
    };
  }

  return {
    valid: true,
  };
}