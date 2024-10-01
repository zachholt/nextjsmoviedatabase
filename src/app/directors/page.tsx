'use client'

import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import Table from '@/components/Table';
import { useRouter } from 'next/navigation';
import FailedLoading from '@/components/FailedLoading';

export default function DirectorDisplay() {
    const router = useRouter();

    useEffect(() => {
        refetch(); 
      }, ['directors']);

    const { data, isLoading, error, refetch } = useQuery<any[]>({
        queryKey: ['directors'],
        queryFn: async () => {
            return (await axios.get('http://localhost:8080/api/directors')).data
        },
    })

    const handleDelete = (director: Director) => {
        if (window.confirm(`Are you sure you want to delete ${director.firstName} ${director.lastName}?`)) {
            axios.delete(`http://localhost:8080/api/directors/${director.id}`)
                .then(response => {
                    console.log(`Deleted director with ID ${director.id}`);
                    window.location.href = "/directors";
                    window.location.reload()
                })
                .catch(error => {
                    console.log(`Could not delete director with ID ${director.id}`);
                    console.error(error);
                });
        }
    };

    const handleAdd = () => {
        router.push(`/add/director`)
    }

    const handleEdit = (directorId: string) => {
        router.push(`/edit/director/${directorId}`);
    };

    if (isLoading) return <div className="text-center text-black py-4">Loading...</div>;
    if (error) return <FailedLoading errorMessage={`An error occurred: ${error.message}`} />;

    return (
        <div className="">
            <div className="flex justify-between items-center p-4">
                <h1 className="text-2xl font-bold text-black">Directors</h1>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleAdd}>Add Director</button>
            </div>
            <Table headers={['Name', 'Date of Birth', 'Actions']}>
                {data?.map((director) => (
                    <tr key={director.id}>
                        <td className="text-black px-6 py-4 whitespace-nowrap">
                            {`${director.firstName} ${director.lastName}`}
                        </td>
                        <td className="text-black px-6 py-4 whitespace-nowrap">
                        {new Date(director.dateOfBirth).toLocaleDateString('en-US', {
                                timeZone: 'UTC',
                            })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <button
                                className="select-none rounded-lg bg-red-500 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none mr-2"
                                type="button"
                                onClick={() => handleDelete(director)}
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