import { useState } from "react";
import * as XLSX from 'xlsx';

interface ComparisonComponentProps {
    excelData: any[];
    setExcelData: (data: any[]) => void;
}

export default function ComparisonComponent({ excelData, setExcelData }: ComparisonComponentProps) {
    const [excelFile, setExcelFile] = useState<ArrayBuffer | null>(null);
    const [typeError, setTypeError] = useState<string | null>(null);
    const [isAccordionOpen, setIsAccordionOpen] = useState(true);

    const predefinedData = [
        { name: "John Doe", project: "Project Alpha", client: "Client A", billable: 40, nonBillable: 10, leaves: 5 },
        { name: "Jane Smith", project: "Project Beta", client: "Client B", billable: 30, nonBillable: 5, leaves: 3 },
    ];

    const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            if (selectedFile.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
                selectedFile.type === 'application/vnd.ms-excel') {
                setTypeError(null);
                const reader = new FileReader();
                reader.readAsArrayBuffer(selectedFile);
                reader.onload = () => {
                    setExcelFile(reader.result as ArrayBuffer);
                };
            } else {
                setTypeError('Please select only Excel file types');
                setExcelFile(null);
            }
        }
    };

    const handleFileSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (excelFile !== null) {
            const workbook = XLSX.read(excelFile, { type: 'array' });
            const worksheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[worksheetName];
            const data = XLSX.utils.sheet_to_json(worksheet);

            setExcelData(data); 
        }
    };

    return (
        <div className="flex flex-col md:flex-row p-6 space-y-4 md:space-y-0 md:space-x-4">

            <div className="md:w-1/2 mb-4 md:mb-0">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                    <table className="min-w-full text-sm text-left text-gray-500 border border-gray-300">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-2 py-1 border">Employee Name</th>
                                <th scope="col" className="px-2 py-1 border">Project</th>
                                <th scope="col" className="px-2 py-1 border">Client</th>
                                <th scope="col" className="px-2 py-1 border">Billable</th>
                                <th scope="col" className="px-2 py-1 border">Non-Billable</th>
                                <th scope="col" className="px-2 py-1 border">No. of Leaves</th>
                            </tr>
                        </thead>
                        <tbody>
                            {predefinedData.map((row, index) => (
                                <tr key={index} className="bg-white border-b hover:bg-gray-100">
                                    <td className="px-2 py-1 whitespace-nowrap border">{row.name}</td>
                                    <td className="px-2 py-1 whitespace-nowrap border">{row.project}</td>
                                    <td className="px-2 py-1 whitespace-nowrap border">{row.client}</td>
                                    <td className="px-2 py-1 whitespace-nowrap border">{row.billable}</td>
                                    <td className="px-2 py-1 whitespace-nowrap border">{row.nonBillable}</td>
                                    <td className="px-2 py-1 whitespace-nowrap border">{row.leaves}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div className={`md:w-1/2 bg-gray-100 rounded-lg shadow-md transition-all duration-300`}>
                <div 
                    onClick={() => setIsAccordionOpen(!isAccordionOpen)} 
                    className={`p-4 cursor-pointer flex justify-between items-center ${isAccordionOpen ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                >
                    <span>{isAccordionOpen ? 'Hide Uploaded Data' : 'Show Uploaded Data'}</span>
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="24" height="24" 
                        fill="none" 
                        viewBox="0 0 24 24"
                        className={`transition-transform duration-300 ${isAccordionOpen ? 'transform rotate-180' : ''}`}
                    >
                        <path fill="#FFF" d="M12 16l4-4H8l4 4z"/>
                    </svg>
                </div>

                {isAccordionOpen && (
                    <div className={`p-4`}>
                        {excelData ? (
                            <>
                                <table className="min-w-full bg-white border border-gray-300 mt-2">
                                    <thead>
                                        <tr>
                                            {Object.keys(excelData[0]).map((key) => (
                                                <th key={key} className="border px=4 py=  2">{key}</th>
                                            ))}
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {excelData.map((individualExcelData, index) => {
                                            const predefinedRow = predefinedData.find(row => row.name === individualExcelData['Employee Name']);
                                            const isMismatch =
                                                predefinedRow &&
                                                (predefinedRow.billable !== individualExcelData['Billable'] ||
                                                 predefinedRow.nonBillable !== individualExcelData['Non-Billable'] ||
                                                 predefinedRow.leaves !== individualExcelData['No. of Leaves']);

                                            return (
                                                <tr key={index} 
                                                    className={`border-b ${isMismatch ? 'bg-red-200' : (index % 2 === 0 ? 'bg-gray-50' : 'bg-white')}`}>
                                                    {Object.keys(individualExcelData).map((key) => (
                                                        <td key={key} className="border px=4 py=  2">{individualExcelData[key]}</td>
                                                    ))}
                                                </tr>
                                            );
                                        })}
                                    </tbody>

                                </table>
                            </>
                        ) : (
                            <>
                                <form onSubmit={handleFileSubmit}>
                                    <h2 className="text-lg font-semibold mb-4">Upload File</h2>
                                    <input 
                                        type="file" 
                                        accept=".xlsx, .xls"
                                        required 
                                        onChange={handleFile} 
                                        className="block w-full text-sm text-gray-500 mb-4 border rounded-md p=2"
                                    />
                                    <button 
                                        type="submit" 
                                        className="w-full bg-blue-500 text-white py=2 rounded hover:bg-blue=600"
                                    >
                                        UPLOAD
                                    </button>

                                    {typeError && (
                                        <div className="mt=4 text-red=600">{typeError}</div>
                                    )}
                                </form>
                            </>
                        )}
                    </div>
                )}
            </div>            
        </div>  
    );
}