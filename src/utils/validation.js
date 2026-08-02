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
      message: "The uploaded file is empty.",
    };
  }

  const columns = Object.keys(data[0]);

  const missingColumns = REQUIRED_COLUMNS.filter(
    (column) => !columns.includes(column)
  );

  if (missingColumns.length > 0) {
    return {
      valid: false,
      message:
        "Missing Columns:\n\n" +
        missingColumns.join("\n"),
    };
  }

  for (let i = 0; i < data.length; i++) {
    const row = data[i];

    if (!row["Employee Name"]) {
      return {
        valid: false,
        message: `Employee Name missing at Row ${i + 2}`,
      };
    }

    if (Number(row["Monthly Salary"]) < 0) {
      return {
        valid: false,
        message: `Invalid Salary at Row ${i + 2}`,
      };
    }

    if (Number(row["Working Days"]) < 0) {
      return {
        valid: false,
        message: `Invalid Working Days at Row ${i + 2}`,
      };
    }

    if (Number(row["Extra Days"]) < 0) {
      return {
        valid: false,
        message: `Invalid Extra Days at Row ${i + 2}`,
      };
    }

    if (Number(row["Leaves Taken"]) < 0) {
      return {
        valid: false,
        message: `Invalid Leaves Taken at Row ${i + 2}`,
      };
    }

    if (Number(row["Commission"]) < 0) {
      return {
        valid: false,
        message: `Invalid Commission at Row ${i + 2}`,
      };
    }
  }

  return {
    valid: true,
  };
}