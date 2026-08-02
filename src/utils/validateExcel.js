const REQUIRED_COLUMNS = [
  "Employee ID",
  "Employee Name",
  "Monthly Salary",
  "Working Days",
  "Weekly Off",
  "Leaves Taken",
  "Commission",
  "Lunch Box Allowed",
];

export function validateExcel(data) {
  if (!data || data.length === 0) {
    return {
      valid: false,
      message: "Uploaded file is empty.",
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

    // Employee Name
    if (!String(row["Employee Name"] || "").trim()) {
      return {
        valid: false,
        message: `Employee Name is missing at Row ${i + 2}`,
      };
    }

    // Monthly Salary
    if (
      isNaN(Number(row["Monthly Salary"])) ||
      Number(row["Monthly Salary"]) < 0
    ) {
      return {
        valid: false,
        message: `Invalid Monthly Salary at Row ${i + 2}`,
      };
    }

    // Working Days
    if (
      isNaN(Number(row["Working Days"])) ||
      Number(row["Working Days"]) < 0
    ) {
      return {
        valid: false,
        message: `Invalid Working Days at Row ${i + 2}`,
      };
    }

    // Weekly Off
    if (
      isNaN(Number(row["Weekly Off"])) ||
      Number(row["Weekly Off"]) < 0
    ) {
      return {
        valid: false,
        message: `Invalid Weekly Off at Row ${i + 2}`,
      };
    }

    // Leaves Taken
    if (
      isNaN(Number(row["Leaves Taken"])) ||
      Number(row["Leaves Taken"]) < 0
    ) {
      return {
        valid: false,
        message: `Invalid Leaves Taken at Row ${i + 2}`,
      };
    }

    // Commission
    if (
      isNaN(Number(row["Commission"])) ||
      Number(row["Commission"]) < 0
    ) {
      return {
        valid: false,
        message: `Invalid Commission at Row ${i + 2}`,
      };
    }

    // Lunch Box Allowed
    const lunchBox = String(
      row["Lunch Box Allowed"] || ""
    )
      .trim()
      .toUpperCase();

    if (lunchBox !== "YES" && lunchBox !== "NO") {
      return {
        valid: false,
        message: `Lunch Box Allowed must be YES or NO at Row ${i + 2}`,
      };
    }
  }

  return {
    valid: true,
  };
}