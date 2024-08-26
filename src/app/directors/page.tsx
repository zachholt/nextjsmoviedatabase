'use client'

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';

const directorDisplay = () => {
    const { data, isLoading, error } = useQuery<any[]>({
        queryKey: ['directors'],
        queryFn: async () => {
            return (await axios.get('http://localhost:8080/api/directors')).data
        },
    })

    if (isLoading) return <div className="text-center text-black py-4">Loading...</div>;
    if (error) return <div className="text-center py-4 text-red-500">An error occurred: {error.message}</div>;

    return (
        <div className="">
            <table className="table-auto min-w-full bg-white">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="text-left px-6 text-xs font-medium text-gray-500 ">First Name</th>
                        <th className="text-left px-6 text-xs font-medium text-gray-500 ">Last Name</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data?.map((director) => (
                        <tr key={director.id}>
                            <td className="text-black px-6 py-4 whitespace-nowrap">{director.firstName}</td>
                            <td className="text-black px-6 py-4 whitespace-nowrap">{director.lastName}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default directorDisplay;