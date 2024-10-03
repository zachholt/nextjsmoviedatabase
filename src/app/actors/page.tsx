'use client'

import React, { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import Table from '@/components/Table';
import { useRouter } from 'next/navigation';
import FailedLoading from '@/components/FailedLoading';

export type Actor = {
    firstName: string;
    lastName: string;
    dateOfBirth: string;
    // Add other properties specific to Actor
};

export default function ActorDisplay() {
    const router = useRouter();

    useEffect(() => {
        refetch(); 
      }, ['actors']);

    const { data, isLoading, error, refetch } = useQuery<any[]>({
        queryKey: ['actors'],
        queryFn: async () => {
            return (await axios.get('http://localhost:8080/api/actors')).data
        },
    })

    const handleDelete = (actor: Actor) => {
        if (window.confirm(`Are you sure you want to delete ${actor.firstName} ${actor.lastName}?`)) {
            axios.delete(`http://localhost:8080/api/actors/${actor.id}`)
                .then(response => {
                    console.log(`Deleted actor with ID ${actor.id}`);
                    window.location.href = "/actors";
                    window.location.reload()
                })
                .catch(error => {
                    console.log(`Could not delete actor with ID ${actor.id}`);
                    console.error(error);
                });
        }
    };

    const handleAdd = () => {
        router.push(`/add/actor/`);
    }

    const handleEdit = (actorId: string) => {
        router.push(`/edit/actor/${actorId}`);
    };

    if (isLoading) return <div className="text-center text-black py-4">Loading...</div>;
    if (error) return <FailedLoading errorMessage={`An error occurred: ${error.message}`} />;

    return (
        <div className="">
            <div className="flex justify-between items-center p-4">
                <h1 className="text-2xl font-bold text-black">Actors</h1>
                <button className="action-button" onClick={handleAdd}>Add Actor</button>
            </div>
            <Table headers={['Actor Name', 'Date of Birth', 'Actions']}>
                {data?.map((actor) => (
                    <tr key={actor.id}>
                        <td className="text-black px-6 py-4 whitespace-nowrap">{`${actor.firstName} ${actor.lastName}`}</td>
                        <td className="text-black px-6 py-4 whitespace-nowrap">
                            {new Date(actor.dateOfBirth).toLocaleDateString('en-US', {
                                timeZone: 'UTC',
                            })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap space-x-5">
                            <button
                                className="action-delete-button"
                                type="button"
                                onClick={() => handleDelete(actor)}
                            >
                                Delete
                            </button>
                            <button
                                className="action-button"
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