import { useContext, useState } from "react";
import { clients, projects, months } from "../constants/appConstants";
import { AuthContextType } from "../types/appTypes";
import { AuthContext } from "../context/AuthContextProvider";
import Comparator from "./Comparator";
// import useGetProjects from "../hooks/useGetProjects";

export default function ConsolidationReport() {
  // const { data } = useGetProjects();
  const { userName } = useContext<AuthContextType>(AuthContext);
  const [excelData, setExcelData] = useState<any[]>(null);

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 20 }, (_, i) => currentYear - i); // Last 20 years

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedFromMonth, setSelectedFromMonth] = useState(
    months[new Date().getMonth()]
  );
  const [selectedToMonth, setSelectedToMonth] = useState(
    months[new Date().getMonth()]
  );
  const [selectedClient, setSelectedClient] = useState("");
  const [selectedProject, setSelectedProject] = useState("");

  return (
    <div className="ps-64 w-full bg-gray-100">
      <div className="mt-2 text-3xl font-medium text-gray-700">Welcome Saravana {userName} !</div>
      <div className="flex-1 p-4">
        <div className="flex items-center space-x-6 mt-4">
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
              htmlFor="fromMonth"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Select From Month
            </label>
            <select
              id="fromMonth"
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
              htmlFor="toMonth"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Select To Month
            </label>
            <select
              id="toMonth"
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

          <div>
            <label
              htmlFor="client"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Select Client
            </label>
            <select
              id="client"
              className="block w-40 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={selectedClient}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setSelectedClient(e.target.value);
              }}
            >
              {clients.map((client) => (
                <option key={client} value={client}>
                  {client}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="project"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Select Project
            </label>
            <select
              id="project"
              className="block w-40 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              value={selectedProject}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                setSelectedProject(e.target.value);
              }}
            >
              {projects!.map((project) => (
                <option key={project.id} value={project.name}>
                  {project.name}
                </option>
              ))}
            </select>
          </div>

          <div className="cursor-pointer border rounded shadow-md p-2 mt-2">
            <svg
              className="mt-1"
              width="24"
              height="30"
              viewBox="0 0 12 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.49979 6.99905V13.1271C7.52979 13.3604 7.4548 13.6093 7.28232 13.7726C7.21295 13.8447 7.13054 13.9019 7.03982 13.9409C6.94911 13.9799 6.85186 14 6.75364 14C6.65543 14 6.55818 13.9799 6.46747 13.9409C6.37675 13.9019 6.29434 13.8447 6.22497 13.7726L4.71768 12.2095C4.63589 12.1265 4.5737 12.0251 4.53598 11.9132C4.49825 11.8012 4.48601 11.6817 4.50021 11.564V6.99905H4.47771L0.158309 1.25983C0.0365318 1.09771 -0.0184164 0.892191 0.00547091 0.688185C0.0293582 0.48418 0.130139 0.298273 0.285791 0.171088C0.428271 0.0622138 0.58575 0 0.750727 0H11.2493C11.4142 0 11.5717 0.0622138 11.7142 0.171088C11.8699 0.298273 11.9706 0.48418 11.9945 0.688185C12.0184 0.892191 11.9635 1.09771 11.8417 1.25983L7.52229 6.99905H7.49979Z"
                fill="#1B3B59"
              />
            </svg>
          </div>

        </div>
      </div>
      <Comparator excelData={excelData} setExcelData={setExcelData}/>
      {excelData && (
            <div className="mt-4 md:w-full flex justify-end">
                <button 
                    onClick={() => console.log("Save to backend")}
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
                >
                    Save Data
                </button>
            </div>
        )}      
    </div>
  );
}
