// components/ActorDisplay.tsx
'use client'

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import Table from '@/components/Table';
import router from 'next/router';

const ActorDisplay = () => {
    const { data, isLoading, error } = useQuery<any[]>({
        queryKey: ['actors'],
        queryFn: async () => {
            return (await axios.get('http://localhost:8080/api/actors')).data
        },
    })

    const handleDelete = (actor: string) => {
        axios.delete(`http://localhost:8080/api/actors/${actor}`)
            .then(response => {
                console.log(`Deleted actor with ID ${actor}`);
                window.location.href = "/actors";
            })
            .catch(error => {
                console.log(`Could not delete actor with ID ${actor}`);
                console.error(error);
            });
    };

    const handleEdit = (actorId: string) => {
        window.location.href = `/edit-actor/${actorId}`;
    };

    if (isLoading) return <div className="text-center text-black py-4">Loading...</div>;
    if (error) return <div className="text-center py-4 text-red-500">An error occurred: {error.message}</div>;

    return (
        <div className="">
            <div className="flex justify-center mb-4">
                <h1 className="text-2xl font-bold mr-4">Actors</h1>
                <Link href="/add-actor" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    <button>Add Actor</button>
                </Link>
            </div>
            <Table headers={['Actor Name', 'Date of Birth', 'Actions']}>
                {data?.map((actor) => (
                    <tr key={actor.id}>
                        <td className="text-black px-6 py-4 whitespace-nowrap">{`${actor.firstName} ${actor.lastName}`}</td>
                        <td className="text-black px-6 py-4 whitespace-nowrap">{new Date(actor.dateOfBirth).toLocaleDateString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <button
                                className="select-none rounded-lg bg-red-500 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none mr-2"
                                type="button"
                                onClick={() => handleDelete(actor.id)}
                            >
                                Delete
                            </button>
                            <button
                                className="select-none rounded-lg bg-blue-500 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                type="button"
                                onClick={() => handleEdit(actor.id)}
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

export default ActorDisplay;
