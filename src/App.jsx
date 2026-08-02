import { useState } from "react";

import Header from "./components/layout/Header";
import PayrollSettings from "./components/payroll/PayrollSettings";
import UploadSection from "./components/payroll/UploadSection";
import SummaryCards from "./components/payroll/SummaryCards";
import EmployeeTable from "./components/payroll/EmployeeTable";

import { processPayroll } from "./utils/processPayroll";
import { calculateSummary } from "./utils/summary";

function App() {
  const [employees, setEmployees] = useState([]);

  const [settings, setSettings] = useState({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
    allowedLeaves: 2,
    teaCost: 8,
    boxCost: 25,
  });

  const processedEmployees = processPayroll(
    employees,
    settings
  );

  const summary = calculateSummary(
    processedEmployees
  );

  return (
    <div className="min-h-screen bg-slate-100">
      <Header />

      <main className="max-w-7xl mx-auto p-6 space-y-6">

        <PayrollSettings
          settings={settings}
          setSettings={setSettings}
        />

        <UploadSection
          setEmployees={setEmployees}
          settings={settings}
        />

        <SummaryCards
          summary={summary}
        />

        <EmployeeTable
  employees={processedEmployees}
  settings={settings}
/>

      </main>
    </div>
  );
}

export default App;