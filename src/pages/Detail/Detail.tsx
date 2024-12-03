import React from "react";

interface Data {
  empId: number;
  empName: string;
  topicsSelected: string[];
}

interface DataProps {
  data: Data[];  
}

const EmployeeTopics: React.FC<DataProps> = ({ data }) => {
  if (!data || data.length === 0) {
    
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4 text-white">
          Employees Selected Topics
        </h1>
        <p className="text-center text-white">No data available</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4 text-white">
        Employees Selected Topics
      </h1>
      <table className="min-w-full table-auto border-collapse border border-gray-600 bg-gray-800">
        <thead className="bg-gray-700">
          <tr>
            <th className="py-2 px-4 border-b text-left text-lg font-semibold text-white">
              Employee ID
            </th>
            <th className="py-2 px-4 border-b text-left text-lg font-semibold text-white">
              Employee Name
            </th>
            <th className="py-2 px-4 border-b text-left text-lg font-semibold text-white">
              Topics Selected
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((employee) => (
            <tr
              key={employee.empId}
              className="bg-gray-700 hover:bg-gray-600 transition-all"
            >
              <td className="py-3 px-4 border-b text-sm text-white">
                {employee.empId}
              </td>
              <td className="py-3 px-4 border-b text-sm text-white">
                {employee.empName}
              </td>
              <td className="py-3 px-4 border-b text-sm text-white">
                <ul className="list-disc pl-5 space-y-1">
                  {employee.topicsSelected.length > 0 ? (
                    employee.topicsSelected.map((topic, index) => (
                      <li key={index} className="text-gray-300 text-sm">
                        {topic}
                      </li>
                    ))
                  ) : (
                    <li className="text-gray-300 text-sm">
                      No topics selected
                    </li>
                  )}
                </ul>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTopics;
