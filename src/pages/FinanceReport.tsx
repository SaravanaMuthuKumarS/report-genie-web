import { useContext } from "react";
import { AuthContextType } from "../types/appTypes";
import { AuthContext } from "../context/AuthContextProvider";
// import useGetConsolidatedProjects from "../hooks/useGetConsolidatedProjects";
import { consolidatedProjects } from "../constants/appConstants";

export default function FinanceReport() {
  // const { data } = useGetConsolidatedProjects();
  const { userName } = useContext<AuthContextType>(AuthContext);

  return (
    <div className="ps-64 w-full bg-gray-100">
      <div className="mt-2 text-3xl font-medium text-gray-700">
        Welcome Saravana {userName} !
      </div>
      <div className="flex-1 p-4">
        <div className="flex items-center space-x-6 mt-4">
          {consolidatedProjects && consolidatedProjects.length > 0 ? (
            <div className="flex flex-col gap-5">
              {consolidatedProjects.map((consolidatedProject) => (
                <div
                  key={consolidatedProject.id}
                  className="p-4 bg-white shadow rounded-md border border-gray-200 w-96 flex justify-between items-center"
                >
                  <h3 className="text-lg font-semibold text-gray-800">
                    {consolidatedProject.name}
                  </h3>
                  <button
                    onClick={() => {}}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    View Report
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-600 text-lg mt-4">
              No reports consolidated.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
