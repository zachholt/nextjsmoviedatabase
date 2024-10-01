'use client'

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Link from 'next/link';
import Table from '@/components/Table';
import { useRouter } from 'next/navigation';

export default function MovieDisplay() {
    const router = useRouter();
    
    const { data, isLoading, error } = useQuery<any[]>({
        queryKey: ['movies'],
        queryFn: async () => {
            return (await axios.get('http://localhost:8080/api/movies')).data;
        },
        refetchOnWindowFocus: true,
    })

    const handleDelete = (movie: Movie) => {
        if (window.confirm(`Are you sure you want to delete ${movie.movieTitle}?`)) {
            axios.delete(`http://localhost:8080/api/movies/${movie.id}`)
                .then(response => {
                    console.log(`Deleted movie with ID ${movie.id}`);
                    window.location.href = "/movies";
                    window.location.reload()
                })
                .catch(error => {
                    console.log(`Could not delete movie with ID ${movie.id}`);
                    console.error(error);
                });
        }
    };

    const handleAdd = () => {
        router.push("/add-movie")
    }

    if (isLoading) return <div className="text-center py-4 text-black">Loading...</div>;
    if (error) return <div className="text-center py-4 text-red-500">An error occurred: {error.message}</div>;

    return (
        <div className="">
            <div className="flex justify-between items-center p-4">
                <h1 className="text-2xl font-bold text-black">Movies</h1>
                <h1 className="text-2xl font-bold text-black">Click on a movie to view more information</h1>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleAdd}>Add Movie</button>
            </div>
            <Table headers={['Movie Title', 'Movie Length', 'Release Date', 'Actions']}>
                {data?.map((movie) => (
                    <tr key={movie.id}>
                        <td className="text-black px-6 py-4 whitespace-nowrap">
                            <Link
                                href={{
                                    pathname: `/movie/${movie.id}`
                                }}
                                className="hover:text-blue-500 hover:underline"
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
                                onClick={() => handleDelete(movie)}
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