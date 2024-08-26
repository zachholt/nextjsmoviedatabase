'use client'

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import router from 'next/router';

const MovieDisplay = () => {
    const { data, isLoading, error } = useQuery<any[]>({
        queryKey: ['movies'],
        queryFn: async () => {
            return (await axios.get('http://localhost:8080/api/movies')).data
        },
    })

    const handleDelete = (movie: string) => {
        axios.delete(`http://localhost:8080/api/movies/${movie}`)
            .then(response => {
                console.log(`Deleted movie with ID ${movie}`);
                window.location.href = "/movies";
            })
            .catch(error => {
                console.log(`Could not delete movie with ID ${movie}`);
                console.error(error);
            });

    };


    if (isLoading) return <div className="text-center py-4 text-black">Loading...</div>;
    if (error) return <div className="text-center py-4 text-red-500">An error occurred: {error.message}</div>;

    return (
        <div className="">
            <div className="spacing-x-15">
                <Link href="/add-movie" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    <button>Add movie</button>
                </Link>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Edit Movies
                </button>
            </div>
            <table className="min-w-full bg-white">
                <thead className="bg-gray-100">
                    <tr>
                        {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 ">ID</th> */}
                        <th className="text-left px-6 text-xs font-medium text-gray-500 ">Title</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {data?.map((movie) => (
                        <tr key={movie.id}>
                            <Link
                                href={{
                                    pathname: `/movie/${movie.id}`,
                                    query: { movie: JSON.stringify(movie) }, // Pass the movie object as a query param
                                }}
                                key={movie.id}
                            >
                                <td className="text-black px-6 py-4 whitespace-nowrap">
                                    {movie.movieTitle}
                                </td>
                            </Link>
                            <button
                                className="select-none rounded-lg bg-red-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                type="button"
                                onClick={() => handleDelete(movie.id)}
                            >
                                Delete Movie
                            </button>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MovieDisplay;