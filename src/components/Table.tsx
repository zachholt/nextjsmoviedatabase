'use client'

import React, { ReactNode, useState } from 'react';


interface TableProps {
  headers: string[];
  children: string[];
}

const Table: React.FC<TableProps> = ({ headers, children }) => {
  const [searchedVal, setSearchedVal] = useState("");
  const filteredChildren = children.filter(children => children === searchedVal)


  return (
    <div className="overflow-x-auto">
      {/* <input onChange={(e) => setSearchedVal(e.target.value)} /> */}
      <table className="min-w-full bg-white table-auto">
        <thead className="bg-gray-100">
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {children}
        </tbody>
      </table>
    </div>
  );
};

export default Table;