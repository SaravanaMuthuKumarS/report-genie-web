import { useContext, useEffect, useState } from "react";
import { months } from "../constants/appConstants";
import { AppContextType, AuthContextType, ExcelRow } from "../types/appTypes";
import { AuthContext } from "../context/AuthContextProvider";
import Comparator from "./Comparator";
import useGetTimeSheet from "../hooks/useGetTimeSheet";
import { AppContext } from "../context/AppContextProvider";
import useGetClients from "../hooks/useGetClients";
import useGetProjects from "../hooks/useGetProjects";
import Select from "react-select";

export default function ConsolidationReport() {
  const { userName } = useContext<AuthContextType>(AuthContext);
  const { clients, projects, timeSheet, setTimeSheet, setClients, setProjects } = useContext<AppContextType>(AppContext);

  const [excelData, setExcelData] = useState<any[]>([]);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 20 }, (_, i) => currentYear - i);

  const [selectedYear, setSelectedYear] = useState(currentYear);

  const [selectedFromMonth, setSelectedFromMonth] = useState(months[new Date().getMonth()]);
  const [selectedToMonth, setSelectedToMonth] = useState(months[new Date().getMonth()]);
  const [selectedClient, setSelectedClient] = useState<{ value: string; label: string } | null>(null);
  const [selectedProject, setSelectedProject] = useState<{ value: string; label: string } | null>(null);
  // const [filter, setFilter] = useState({
  //   selectedYear,
  //   selectedFromMonth,
  //   selectedToMonth,
  //   selectedClient,
  //   selectedProject,
  // });
  const [shouldFetchTimeSheet, setShouldFetchTimeSheet] = useState(false); // New state for triggering API call

  const { data: clientsData } = useGetClients();
  const { data: projectsData } = useGetProjects();

  const { data: timesheets, refetch: timeSheetRefetch } = useGetTimeSheet({
    selectedYear,
    selectedFromMonth,
    selectedToMonth,
    selectedClient: selectedClient ? selectedClient.value : '',
    selectedProject: selectedProject ? selectedProject.value : '',
  });

  useEffect(() => {
    if (clientsData && clientsData !== clients) {
      setClients(clientsData);
    }
  }, [clientsData, clients, setClients]);

  useEffect(() => {
    if (projectsData && projectsData !== projects) {
      setProjects(projectsData);
    }
  }, [projectsData, projects, setProjects]);

  useEffect(() => {
    if (shouldFetchTimeSheet) {
      timeSheetRefetch();
      setTimeSheet(timesheets!); // Assuming timesheets has data after refetch
      setShouldFetchTimeSheet(false); // Reset after fetching
    }
  }, [shouldFetchTimeSheet, timeSheetRefetch, timesheets, setTimeSheet]);

  // Trigger the fetch when filters are applied
  function handleFilter() {
    setShouldFetchTimeSheet(true); // Trigger the refetch
  }

  const clientOptions = clients?.map(client => ({
    value: client.id,
    label: client.name,
  }));

  const projectOptions = projects?.map(project => ({
    value: project.id,
    label: project.name,
  }));

  return (
    <div className="w-full bg-gray-100 p-6">
      <div className="text-3xl font-semibold text-gray-800 mb-6">
        Welcome, {userName}!
      </div>

      <div className="bg-white p-3 rounded-lg shadow-sm space-y-3 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {/* Year Selector */}
          <div>
            <label htmlFor="year" className="block text-xs font-medium text-gray-700 mb-1">
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
            <label htmlFor="fromMonth" className="block text-xs font-medium text-gray-700 mb-1">
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
            <label htmlFor="toMonth" className="block text-xs font-medium text-gray-700 mb-1">
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
            <label htmlFor="client" className="block text-xs font-medium text-gray-700 mb-1">
              Select Client
            </label>
            <Select
              id="client"
              className="text-sm"
              value={selectedClient} // React-Select value
              onChange={(selectedOption) => setSelectedClient(selectedOption)} // Handle selection change
              options={clientOptions} // Options passed to react-select
              isClearable={true} // Optional: adds a clear button to the select input
            />
          </div>

          {/* Project Selector (Updated to React-Select) */}
          <div>
            <label htmlFor="project" className="block text-xs font-medium text-gray-700 mb-1">
              Select Project
            </label>
            <Select
              id="project"
              className="text-sm"
              value={selectedProject} // React-Select value
              onChange={(selectedOption) => setSelectedProject(selectedOption)} // Handle selection change
              options={projectOptions} // Options passed to react-select
              isClearable={true} // Optional: adds a clear button to the select input
            />
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

      {timeSheet.length > 0 ? (
        <Comparator excelData={excelData} setExcelData={setExcelData} />
      ) : (
        <p className="text-center text-gray-600 font-semibold py-4">
          No records found. Please adjust your filters.
        </p>
      )}
    </div>
  );
}
