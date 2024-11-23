import { useState } from "react";

export default function ConsolidationReport() {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 20 }, (_, i) => currentYear - i); // Last 20 years
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedFromMonth, setSelectedFromMonth] = useState(
    months[new Date().getMonth()]
  );
  const [selectedToMonth, setSelectedToMonth] = useState(
    months[new Date().getMonth()]
  );

  return (
    <>
      <div className="flex-1 bg-gray-100 p-4">

        <div className="flex items-center space-x-4 mt-4">
          <div>
            <label
              htmlFor="year"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Select Year
            </label>
            <select
              id="year"
              className="block w-40 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={selectedYear}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setSelectedYear(Number(e.target.value));
              }}
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="month"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Select From Month
            </label>
            <select
              id="month"
              className="block w-40 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={selectedFromMonth}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setSelectedFromMonth(e.target.value);
              }}
            >
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="month"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Select To Month
            </label>
            <select
              id="month"
              className="block w-40 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={selectedToMonth}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setSelectedToMonth(e.target.value);
              }}
            >
              {months.map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </>
  );
}
