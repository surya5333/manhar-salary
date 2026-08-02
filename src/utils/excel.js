import * as XLSX from "xlsx";

export const readExcel = (file) => {
  return new Promise((resolve, reject) => {

    const reader = new FileReader();

    reader.onload = (event) => {

      const workbook = XLSX.read(event.target.result, {
        type: "binary",
      });

      const worksheet =
        workbook.Sheets[workbook.SheetNames[0]];

      const json =
        XLSX.utils.sheet_to_json(worksheet);

      resolve(json);
    };

    reader.onerror = reject;

    reader.readAsBinaryString(file);

  });
};