import { useContext, useState } from "react";
import { AuthContextType } from "../types/appTypes";
import { AuthContext } from "../context/AuthContextProvider";
import { predefinedHeaders, reportedProjects } from "../constants/appConstants";
import { Table } from "./Comparator";
import InvoiceDocument from "./InvoiceDocument";
import { pdf } from "@react-pdf/renderer";

export default function FinanceReport() {
  const { userName } = useContext<AuthContextType>(AuthContext);
  const [projectId, setProjectId] = useState("");
  const [payPerHour, setPayPerHour] = useState<number>(0);
  const [currency, setCurrency] = useState("");
  const [popUp, setPopUp] = useState(false);
  const [isIndividualPay, setIsIndividualPay] = useState(false);
  const [individualPayValues, setIndividualPayValues] = useState<{ [key: number]: number }>({});

  const handleViewReport = (id: string) => {
    if (projectId === id) {
      setProjectId("");
      setPayPerHour(0);
      setIsIndividualPay(false);
    } else {
      setProjectId(id);
      setPayPerHour(0);
      setIsIndividualPay(false);
    }
  };

  const handleGenerateInvoice = async (timesheet: any[], projectName: string) => {
    // Generate the updated timesheet with calculated payable amounts
    const updatedTimesheet = timesheet.map((row, rowIndex) => {
      const rowPay = isIndividualPay
        ? individualPayValues[rowIndex] || 0
        : payPerHour;
      return { ...row, pay: rowPay };
    });
  
    console.log(updatedTimesheet); // Debugging
  
    if (isIndividualPay) {
      console.log(isIndividualPay, "isIndividualPay");
      // Generate a single PDF for all individuals
      const blob = await pdf(
        <InvoiceDocument
          userName="All Users"
          project={projectName}
          timesheet={updatedTimesheet}
          payPerHour={payPerHour}
        />
      ).toBlob();
  
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${projectName}_Individual_Invoices.pdf`;
      link.click();
    } else {
      // Generate and download separate PDFs for each entry in the timesheet
      for (const val of timesheet) {
        const blob = await pdf(
          <InvoiceDocument
            userName={val.name}
            project={val.project}
            timesheet={[val]} // Single entry
            payPerHour={payPerHour}
          />
        ).toBlob();
  
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${val.name}_Invoice.pdf`;
        link.click();
      }
    }
  
    // Show success popup
    setPopUp(true);
  };
  

  const handlePayChange = (rowIndex: number, value: number) => {
    setIndividualPayValues((prevValues) => ({
      ...prevValues,
      [rowIndex]: value,
    }));
  };

  return (
    <div className="p-6 w-full bg-gray-100">
      <div className="mt-2 text-3xl font-medium text-gray-700">
        Welcome, {userName}!
      </div>
      <div className="flex-1 p-4">
        <div className="flex items-center space-x-6 mt-4">
          {reportedProjects && reportedProjects.length > 0 ? (
            <div className="flex flex-col gap-6 w-full p-4">
              {popUp && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50" style={{ zIndex: 9999 }}>
                  <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                    <h2 className="text-xl font-semibold text-center text-green-500">
                      Invoice Generated Successfully
                    </h2>
                    <div className="mt-4 text-center">
                      <button
                        onClick={() => {
                          setPopUp(false);
                          setProjectId("");
                        }}
                        className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 focus:ring-2 focus:ring-blue-300"
                      >
                        OK
                      </button>
                    </div>
                  </div>
                </div>
              )}
              {reportedProjects.map((project) => (
                <div
                  key={project.id}
                  className="py-2 mx-2 px-4 bg-white shadow-lg rounded-xl border border-gray-200 hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-gray-900 capitalize">{project.name}</h3>
                    <button
                      onClick={() => handleViewReport(project.id)}
                      className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-all"
                    >
                      View Report
                    </button>
                  </div>

                  {projectId === project.id && (
                    <div className="mt-6 flex flex-wrap gap-6" style={{ maxWidth: "100%" }}>
                      <div className="flex-1 min-w-0 overflow-x-auto">
                        <h2 className="text-2xl font-bold mb-4 text-gray-700">{project.name} - Report</h2>
                        <Table headers={predefinedHeaders} data={project.timesheet} individualPay={isIndividualPay} handlePayChange={handlePayChange} individualPayValues={individualPayValues} />
                      </div>

                      <div className="flex flex-col gap-3 w-1/3 max-w-xs p-4 bg-white rounded-lg shadow-md">
                        <div className="flex items-center gap-2 mb-3">
                          <input
                            type="checkbox"
                            checked={isIndividualPay}
                            onChange={() => setIsIndividualPay(!isIndividualPay)}
                            className="h-4 w-4 text-pink-500 border-gray-300 rounded-sm"
                          />
                          <label className="text-sm font-medium text-gray-700">Individual Pay</label>
                        </div>

                        {!isIndividualPay && (
                          <div className="flex flex-col gap-2">
                            <label className="text-xs font-medium text-gray-600">Pay per Hour:</label>
                            <input
                              type="text"
                              value={payPerHour || ""}
                              onChange={(e) => setPayPerHour(Number(e.target.value))}
                              className="px-3 py-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
                              placeholder="Amount"
                            />
                          </div>
                        )}

                        {/* Currency Dropdown */}
                        <div className="flex flex-col gap-2 mt-3">
                          <label className="text-xs font-medium text-gray-600">Select Currency:</label>
                          <select
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                            className="px-3 py-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-300"
                          >
                            <option value="USD">Dollar (USD)</option>
                            <option value="INR">Rupees (INR)</option>
                            <option value="EUR">Euro (EUR)</option>
                          </select>
                        </div>

                        {/* Generate Invoice Button */}
                        <div className="flex flex-col gap-2 mt-4">
                          <button
                            onClick={() => handleGenerateInvoice(project.timesheet, project.name)}
                            className="px-4 py-1 text-sm text-white bg-pink-500 rounded-md hover:bg-pink-600 focus:ring-2 focus:ring-pink-300"
                          >
                            Generate Invoice
                          </button>
                        </div>
                      </div>

                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-600 text-lg mt-4">No reports consolidated.</div>
          )}
        </div>
      </div>
    </div>
  );
}
