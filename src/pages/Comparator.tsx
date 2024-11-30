import { useState } from "react";
import * as XLSX from "xlsx";
import {
  HOME_ROUTE,
  predefinedData,
  predefinedHeaders,
} from "../constants/appConstants";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

interface ComparisonComponentProps {
  excelData: any[] | null;
  setExcelData: (data: any[] | null) => void;
}

interface TableProps {
  headers: string[];
  data: any[];
  highlightMismatch?: (row: any, key?: string) => boolean;
  individualPay?: boolean;
  individualPayValues?: { [key: number]: number };
  handlePayChange?: (rowIndex: number, value: number) => void;
}

export const Table = ({ headers, data, highlightMismatch, individualPay, handlePayChange, individualPayValues }: TableProps) => {

  return (
    <div className="relative overflow-x-auto sm:rounded-lg h-full bg-white shadow-md rounded-md">
      <table className="min-w-full text-sm text-left text-gray-700 border border-gray-300">
        <thead className="text-xs text-gray-600 uppercase bg-gray-100">
          <tr>
            {headers.map((header) => (
              <th key={header} scope="col" className="px-4 py-2 border-b">
                {header}
              </th>
            ))}
            {individualPay && <th className="px-4 py-2 border-b">Pay per Hour</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => {
            const isRowMismatch = highlightMismatch ? highlightMismatch(row) : false;
            return (
              <tr
                key={rowIndex}
                className={`bg-white border-b hover:bg-gray-50 ${isRowMismatch && "bg-red-100"}`}
              >
                {Object.entries(row).map(([key, value], colIndex) => {
                  const isColumnMismatch = highlightMismatch ? highlightMismatch(row, key) : false;
                  return (
                    <td
                      key={colIndex}
                      className={`px-4 py-2 whitespace-nowrap border-b ${isColumnMismatch ? "bg-red-300 font-bold" : ""}`}
                    >
                      {String(value)}
                    </td>
                  );
                })}
                {individualPay && (
                  <td className="px-4 py-2 whitespace-nowrap border-b">
                    <input
                      type="text"
                      value={individualPayValues![rowIndex] || ""}
                      onChange={(e) => handlePayChange!(rowIndex, Number(e.target.value))}
                      className="px-3 py-1 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                      placeholder="Enter Amount"
                    />
                  </td>

                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default function Comparator({
  excelData,
  setExcelData,
}: ComparisonComponentProps) {
  const [excelFile, setExcelFile] = useState<ArrayBuffer | null>(null);
  const [typeError, setTypeError] = useState<string | null>(null);
  const [isUploadOpen, setIsUploadOpen] = useState<boolean>(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const navigate = useNavigate();

  const sortData = (data: any[], key: string) => {
    return data.sort((a, b) => {
      if (a[key] < b[key]) return -1;
      if (a[key] > b[key]) return 1;
      return 0;
    });
  };

  const sortedPredefinedData = sortData([...predefinedData], "name");
  const sortedExcelData = excelData ? sortData([...excelData], "name") : [];

  const handleConsolidate = () => {
    setIsPopupOpen(true);
  };

  const handleYesClick = () => {
    setIsPopupOpen(false);
    navigate(HOME_ROUTE);
  };

  const handleNoClick = () => {
    setIsPopupOpen(false);
    navigate(HOME_ROUTE);
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (
        selectedFile.type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        selectedFile.type === "application/vnd.ms-excel"
      ) {
        setTypeError(null);
        const reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = () => {
          setExcelFile(reader.result as ArrayBuffer);
        };
      } else {
        setTypeError("Please select only Excel file types");
        setExcelFile(null);
      }
    }
  };

  const handleFileSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: "array" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(data);
    }
    setIsUploadOpen(true);
  };

  const hasAnyMismatch = (): boolean => {
    return sortedPredefinedData.some((row) => {
      const excelRow = sortedExcelData.find(
        (item) => item["name"] === row["name"]
      );
      if (!excelRow) return false;
      return (
        excelRow.billable !== row.billable ||
        excelRow.nonBillable !== row.nonBillable ||
        excelRow.leaves !== row.leaves ||
        excelRow.totalHours !== row.totalHours
      );
    });
  };

  const handleExcelMismatch = (
    row: Record<string, any>,
    key?: string
  ): boolean => {
    const predefinedRow = predefinedData.find(
      (item) => item.name === row["name"]
    );
    if (!predefinedRow) return false;
    if (!key) {
      return (
        predefinedRow.billable !== row["billable"] ||
        predefinedRow.nonBillable !== row["nonBillable"] ||
        predefinedRow.leaves !== row["leaves"] ||
        predefinedRow.totalHours !== row["totalHours"]
      );
    }
    switch (key) {
      case "billable":
        return predefinedRow.billable !== row["billable"];
      case "nonBillable":
        return predefinedRow.nonBillable !== row["nonBillable"];
      case "leaves":
        return predefinedRow.leaves !== row["leaves"];
      case "totalHours":
        return predefinedRow.totalHours !== row["totalHours"];
      default:
        return false;
    }
  };

  const handleTableMismatch = (
    row: Record<string, any>,
    key?: string
  ): boolean => {
    const excelRow = excelData!.find((item) => item.name === row["name"]);
    if (!excelRow) return false;
    if (!key) {
      return (
        excelRow.billable !== row["billable"] ||
        excelRow.nonBillable !== row["nonBillable"] ||
        excelRow.leaves !== row["leaves"] ||
        excelRow.totalHours !== row["totalHours"]
      );
    }
    switch (key) {
      case "billable":
        return excelRow.billable !== row["billable"];
      case "nonBillable":
        return excelRow.nonBillable !== row["nonBillable"];
      case "leaves":
        return excelRow.leaves !== row["leaves"];
      case "totalHours":
        return excelRow.totalHours !== row["totalHours"];
      default:
        return false;
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 flex-grow overflow-y-auto">
        {isPopupOpen && (
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center"
            style={{ zIndex: 9999 }}
          >
            <div className="bg-white p-6 rounded shadow-lg w-96">
              <h2 className="text-lg font-bold mb-4">
                Consolidation Sent to Finance Team
              </h2>
              <p className="mb-4">Do you need a local copy of the data?</p>
              <div className="flex justify-end space-x-4">
                <Button title="No" click={handleNoClick}></Button>
                <Button title="Yes" click={handleYesClick}></Button>
              </div>
            </div>
          </div>
        )}

        <div className={`${isUploadOpen ? "w-1/2" : "w-full"} overflow-hidden`}>
          {excelData ? (
            <Table
              headers={predefinedHeaders}
              data={sortedPredefinedData}
              highlightMismatch={handleTableMismatch}
            />
          ) : (
            <Table headers={predefinedHeaders} data={sortedPredefinedData} />
          )}
        </div>

        {isUploadOpen && (
          <div className={"overflow-hidden"} style={{ width: 425 }}>
            {excelData ? (
              <>
                <Table
                  headers={predefinedHeaders}
                  data={sortedExcelData}
                  highlightMismatch={handleExcelMismatch}
                />
              </>
            ) : (
              <form onSubmit={handleFileSubmit} className="space-y-4">
                <h2 className="text-lg font-semibold mb-4">Upload File</h2>
                <input
                  type="file"
                  accept=".xlsx, .xls"
                  required
                  onChange={handleFile}
                  className="block w-full text-sm text-gray-500 mb-4 border rounded-md p-2"
                />
                {typeError && (
                  <div className="mt-4 text-red-600">{typeError}</div>
                )}
                <Button title="Compare" />
              </form>
            )}
          </div>
        )}
      </div>

      {!isUploadOpen ? (
        <div className="flex justify-around w-full p-4">
          <Button title="Instant Consolidation" click={handleConsolidate} />
          <Button title="Upload Sheet" click={() => setIsUploadOpen(true)} />
        </div>
      ) : (
        <div className="flex justify-around w-full p-4 items-center space-x-4">
          <div>
            {hasAnyMismatch() && (
              <span className="text-red-600 font-bold text-sm text-center mr-4">
                Resolve to Consolidate
              </span>
            )}
            <Button
              title="Consolidate"
              click={handleConsolidate}
              disable={hasAnyMismatch()}
            />
          </div>
          {excelData && (
            <Button title="Back" click={() => setExcelData(null)} />
          )}
          {excelData === null && isUploadOpen && (
            <Button title="Back" click={() => setIsUploadOpen(false)} />
          )}
        </div>
      )}
    </div>
  );
}
