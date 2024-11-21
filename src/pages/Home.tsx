import logo from "../../public/logo.png";
import picture from "../../public/1-change1.jpg"
import { useState } from "react";

export default function Home() {

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 20 }, (_, i) => currentYear - i); // Last 20 years
  const months = [
    'January', 'February', 'March', 'April', 'May',
    'June', 'July', 'August', 'September', 'October',
    'November', 'December',
  ];

  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedMonth, setSelectedMonth] = useState(months[new Date().getMonth()]);

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(Number(e.target.value));
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(e.target.value);
  };
  
    return (
      <div className="relative h-screen flex">
        {/* Sidebar */}
        <div className="w-48 bg-gray-800 text-white flex flex-col p-4 shadow-lg">
          {/* Logo container */}
          <div className="flex items-center justify-start mb-6">
            <img src={logo} alt="Logo" className="h-12 w-auto opacity-70" />
          </div>

          {/* Menu Items */}
          <ul className="space-y-4 flex-grow">
            <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Home</li>
            <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">About</li>
            <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Services</li>
            <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-gray-100 p-4">
          {/* <h1 className="text-3xl font-semibold mb-4">Home Page</h1> */}

          <div className="flex items-center space-x-4 mt-4">
            <div>
              <label htmlFor="year" className="block text-sm font-medium text-gray-700 mb-1">
                Select Year
              </label>
              <select
                id="year"
                className="block w-40 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={selectedYear}
                onChange={handleYearChange}
              >
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {/* Month Dropdown */}
            <div>
              <label htmlFor="month" className="block text-sm font-medium text-gray-700 mb-1">
                Select Month
              </label>
              <select
                id="month"
                className="block w-40 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                value={selectedMonth}
                onChange={handleMonthChange}
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

        <div className="absolute  right-4 flex items-center space-x-2 bg-white p-2 rounded-lg shadow-md">
          <img
            src={picture} 
            alt="Profile"
            className="h-10 w-10 rounded-full border-2 border-gray-800"
          />
          <div className="text-black">
            <p className="font-semibold">John Doe</p>
            <p className="text-sm">Admin</p>
          </div>
        </div>
      </div>
    );
  }
  