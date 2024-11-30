import { useContext, useState } from "react";
import { dummyClients, dummyProjects, months } from "../constants/appConstants";
import { AuthContextType } from "../types/appTypes";
import { AuthContext } from "../context/AuthContextProvider";
import Comparator from "./Comparator";

export default function ConsolidationReport() {
  const { userName } = useContext<AuthContextType>(AuthContext);
  const [excelData, setExcelData] = useState<any[] | null>(null);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 20 }, (_, i) => currentYear - i);

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedFromMonth, setSelectedFromMonth] = useState(
    months[new Date().getMonth()]
  );
  const [selectedToMonth, setSelectedToMonth] = useState(
    months[new Date().getMonth()]
  );
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedProject, setSelectedProject] = useState("");

  const [dummyBoolean, setDummyBoolean] = useState(false);

  function handleFilter() {
    // call useGetTimeSheet here
    setDummyBoolean(true);
  }

  return (
    <div className="w-full bg-gray-100 p-6">
      <div className="text-3xl font-semibold text-gray-800 mb-6">
        Welcome, Saravana Muthu Kumar S{userName}!
      </div>

      <div className="bg-white p-3 rounded-lg shadow-sm space-y-3 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {/* Year Selector */}
          <div>
            <label
              htmlFor="year"
              className="block text-xs font-medium text-gray-700 mb-1"
            >
              Select Year
            </label>
            <select
              id="year"
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
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

          {/* From Month Selector */}
          <div>
            <label
              htmlFor="fromMonth"
              className="block text-xs font-medium text-gray-700 mb-1"
            >
              Select From Month
            </label>
            <select
              id="fromMonth"
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
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

          {/* To Month Selector */}
          <div>
            <label
              htmlFor="toMonth"
              className="block text-xs font-medium text-gray-700 mb-1"
            >
              Select To Month
            </label>
            <select
              id="toMonth"
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
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

          {/* Client Selector */}
          <div>
            <label
              htmlFor="client"
              className="block text-xs font-medium text-gray-700 mb-1"
            >
              Select Client
            </label>
            <select
              id="client"
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
              value={selectedClient}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setSelectedClient(e.target.value);
              }}
            >
              {dummyClients.map((client) => (
                <option key={client} value={client}>
                  {client}
                </option>
              ))}
            </select>
          </div>

          {/* Project Selector */}
          <div>
            <label
              htmlFor="project"
              className="block text-xs font-medium text-gray-700 mb-1"
            >
              Select Project
            </label>
            <select
              id="project"
              className="block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
              value={selectedProject}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setSelectedProject(e.target.value);
              }}
            >
              {dummyProjects!.map((project) => (
                <option key={project.id} value={project.name}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>

          {/* Filter Button */}
          <div
            onClick={handleFilter}
            className="cursor-pointer w-full md:w-auto bg-blue-600 text-white text-xs font-semibold py-2 px-3 rounded-md shadow-sm hover:bg-blue-700 transition-all duration-300 flex items-center justify-center space-x-2 mt-5"
          >
            <svg
              className="w-3 h-3"
              width="12"
              height="16"
              viewBox="0 0 12 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.49979 6.99905V13.1271C7.52979 13.3604 7.4548 13.6093 7.28232 13.7726C7.21295 13.8447 7.13054 13.9019 7.03982 13.9409C6.94911 13.9799 6.85186 14 6.75364 14C6.65543 14 6.55818 13.9799 6.46747 13.9409C6.37675 13.9019 6.29434 13.8447 6.22497 13.7726L4.71768 12.2095C4.63589 12.1265 4.5737 12.0251 4.53598 11.9132C4.49825 11.8012 4.48601 11.6817 4.50021 11.564V6.99905H4.47771L0.158309 1.25983C0.0365318 1.09771 -0.0184164 0.892191 0.00547091 0.688185C0.0293582 0.48418 0.130139 0.298273 0.285791 0.171088C0.428271 0.0622138 0.58575 0 0.750727 0H11.2493C11.4142 0 11.5717 0.0622138 11.7142 0.171088C11.8699 0.298273 11.9706 0.48418 11.9945 0.688185C12.0184 0.892191 11.9635 1.09771 11.8417 1.25983L7.52229 6.99905H7.49979Z"
                fill="#ffffff"
              />
            </svg>
            <span>Apply Filters</span>
          </div>
        </div>
      </div>

      {dummyBoolean ? (
        <Comparator excelData={excelData} setExcelData={setExcelData} />
      ) : (
        <p className="text-center text-gray-600 font-semibold py-4">
          No records found. Please adjust your filters.
        </p>
      )}
    </div>
  );
}
