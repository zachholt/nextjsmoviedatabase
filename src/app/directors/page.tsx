'use client'

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import Table from '@/components/Table';

const DirectorDisplay = () => {
    const { data, isLoading, error } = useQuery<any[]>({
        queryKey: ['directors'],
        queryFn: async () => {
            return (await axios.get('http://localhost:8080/api/directors')).data
        },
    })

    const handleDelete = (director: string) => {
        axios.delete(`http://localhost:8080/api/directors/${director}`)
            .then(response => {
                console.log(`Deleted director with ID ${director}`);
                window.location.href = "/directors";
            })
            .catch(error => {
                console.log(`Could not delete director with ID ${director}`);
                console.error(error);
            });
    };

    const handleEdit = (director: string) => {
        // Implement edit functionality here
        console.log(`Edit director with ID ${director}`);
    };

    if (isLoading) return <div className="text-center text-black py-4">Loading...</div>;
    if (error) return <div className="text-center py-4 text-red-500">An error occurred: {error.message}</div>;

    return (
        <div className="">
            <div className="flex justify-center mb-4">
                <h1 className="text-2xl font-bold mr-4">Directors</h1>
                <Link href="/add-director" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    <button>Add Director</button>
                </Link>
            </div>
            <Table headers={['Name', 'Date of Birth', 'Actions']}>
                {data?.map((director) => (
                    <tr key={director.id}>
                        <td className="text-black px-6 py-4 whitespace-nowrap">
                            {`${director.firstName} ${director.lastName}`}
                        </td>
                        <td className="text-black px-6 py-4 whitespace-nowrap">
                            {new Date(director.dateOfBirth).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <button
                                className="select-none rounded-lg bg-red-500 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none mr-2"
                                type="button"
                                onClick={() => handleDelete(director.id)}
                            >
                                Delete
                            </button>
                            <button
                                className="select-none rounded-lg bg-blue-500 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                type="button"
                                onClick={() => handleEdit(director.id)}
                            >
                                Edit
                            </button>
                        </td>
                    </tr>
                ))}
            </Table>
        </div>
    );
};

export default DirectorDisplay;
