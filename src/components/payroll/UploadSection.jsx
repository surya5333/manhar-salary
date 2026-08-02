import { useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { validateExcel } from "@/utils/validateExcel";
import {
  Upload,
  Download,
  FileSpreadsheet,
  CheckCircle,
} from "lucide-react";

import { downloadTemplate } from "@/data/template";
import { readExcel } from "@/utils/excel";

export default function UploadSection({ setEmployees, settings }) {
  const fileInputRef = useRef(null);

  const [fileName, setFileName] = useState("");

  const handleChooseFile = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    try {
      setFileName(file.name);

      const data = await readExcel(file);
      const validation=validateExcel(data);
      if(!validation.valid){
        alert(validation.message);
        return;
        }

      const employees = data.map((row, index) => ({
        id: row["Employee ID"] || `EMP${String(index + 1).padStart(3, "0")}`,
        name: row["Employee Name"] || "",
        monthlySalary: Number(row["Monthly Salary"] || 0),
        workingDays: Number(row["Working Days"] || 0),
        extraDays: Number(row["Extra Days"] || 0),
        leavesTaken: Number(row["Leaves Taken"] || 0),
        commission: Number(row["Commission"] || 0),
      }));

      setEmployees(employees);
    } catch (error) {
      console.error(error);
      alert("Unable to read the selected file.");
    }

    e.target.value = "";
  };

  return (
    <Card className="p-6 shadow-sm">

      <div className="flex flex-col md:flex-row justify-between gap-4">

        <div>
          <h2 className="text-2xl font-bold">
            Employee Data
          </h2>

          <p className="text-gray-500 mt-1">
            Download the template, fill employee details and upload it.
          </p>
        </div>

        <Button
          variant="outline"
          onClick={() => downloadTemplate(settings)}
        >
          <Download className="mr-2 h-4 w-4" />
          Download Template
        </Button>

      </div>

      <div className="mt-8 border-2 border-dashed border-emerald-300 rounded-xl p-12 text-center">

        <Upload
          className="mx-auto text-emerald-600"
          size={50}
        />

        <h3 className="text-xl font-semibold mt-4">
          Upload Employee Excel
        </h3>

        <p className="text-gray-500 mt-2">
          Supported: .xlsx .xls .csv
        </p>

        <Button
          className="mt-6"
          onClick={handleChooseFile}
        >
          <FileSpreadsheet className="mr-2 h-4 w-4" />
          Choose File
        </Button>

        <input
          ref={fileInputRef}
          hidden
          type="file"
          accept=".xlsx,.xls,.csv"
          onChange={handleFileChange}
        />

        {fileName && (
          <div className="mt-6 flex items-center justify-center gap-2 text-emerald-700 font-medium">
            <CheckCircle size={18} />
            {fileName}
          </div>
        )}

      </div>

    </Card>
  );
}