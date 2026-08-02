import { useState } from "react";

export default function usePayroll() {
  const [employees, setEmployees] = useState([]);
  const [summary, setSummary] = useState({});
  const [settings, setSettings] = useState({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
    allowedLeaves: 2,
    teaCost: 8,
    boxCost: 25,
  });

  return {
    employees,
    setEmployees,
    summary,
    setSummary,
    settings,
    setSettings,
  };
}