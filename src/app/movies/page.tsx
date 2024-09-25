// components/MovieDisplay.tsx
'use client'

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import Table from '@/components/Table';

const MovieDisplay = () => {
    const { data, isLoading, error } = useQuery<any[]>({
        queryKey: ["movies" + Math.floor(Math.random() * 1000)],
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

    //if (isLoading) return <div className="text-center py-4 text-black">Loading...</div>;
    if (error) return <div className="text-center py-4 text-red-500">An error occurred: {error.message}</div>;

    return (
        <div className="">
            <div className="flex justify-center mb-4">
            <h1 className="text-2xl font-bold">Movies</h1>
                <Link href="/add-movie" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    <button>Add movie</button>
                </Link>
            </div>
            <Table headers={['Movie Title', 'Movie Length', 'Release Date', 'Actions']}>
                {data?.map((movie) => (
                    <tr key={movie.id}>
                        <td className="text-black px-6 py-4 whitespace-nowrap">
                            <Link
                                href={{
                                    pathname: `/movie/${movie.id}`
                                }}
                            >
                                {movie.movieTitle}
                            </Link>
                        </td>
                        <td className="text-black px-6 py-4 whitespace-nowrap">{movie.movieLength}</td>
                        <td className="text-black px-6 py-4 whitespace-nowrap">{new Date(movie.releaseDate).toLocaleDateString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            <button
                                className="select-none rounded-lg bg-red-500 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-red-500/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                                type="button"
                                onClick={() => handleDelete(movie.id)}
                            >
                                Delete Movie
                            </button>
                        </td>
                    </tr>
                ))}
            </Table>
        </div>
    );
};

export default MovieDisplay;