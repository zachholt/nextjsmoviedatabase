'use client'

import React, { ReactNode } from 'react';

interface TableProps {
  headers: string[];
  children: ReactNode;
}

const Table: React.FC<TableProps> = ({ headers, children }) => {
  return (
    <table className="min-w-full bg-white">
      <thead className="bg-gray-100">
        <tr>
          {headers.map((header, index) => (
            <th key={index} className="text-left px-6 text-xs font-medium text-gray-500">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {children}
      </tbody>
    </table>
  );
};

export default Table;