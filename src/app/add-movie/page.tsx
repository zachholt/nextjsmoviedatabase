"use client";

import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Dropdown from "@/components/Dropdown";
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';

export default function AddMovieForm() {
    const router = useRouter();
    const queryClient = useQueryClient();

    // useEffect(() => {
    //     window.location.reload();
    //     e.preventDefault()    
    // }, []);

    const [selectedGenre, setSelectedGenre] = useState("");
    const [selectedDirector, setSelectedDirector] = useState("");
    const [selectedRating, setSelectedRating] = useState("");
    const [selectedActors, setSelectedActors] = useState<number[]>([]);

    const genres = [
        { id: 1, genre: "Action" },
        { id: 2, genre: "Adventure" },
        { id: 3, genre: "Comedy" },
        { id: 4, genre: "Drama" },
        { id: 5, genre: "Fantasy" },
        { id: 6, genre: "Horror" },
        { id: 7, genre: "Mystery" },
        { id: 8, genre: "Romance" },
        { id: 9, genre: "Science Fiction" },
        { id: 10, genre: "Thriller" },
    ];

    const { data: directors, isLoading: directorsLoading, error: directorsError } = useQuery<any[]>({
        queryKey: ["directors"],
        queryFn: async () => {
            const response = await axios.get(`http://localhost:8080/api/directors`);
            return response.data.map((director: { id: number, firstName: string; lastName: string; dateOfBirth: string; }) => ({
                id: director.id,
                value: `${director.firstName} ${director.lastName}`,
                firstName: director.firstName,
                lastName: director.lastName,
                dateOfBirth: director.dateOfBirth,
            }));
        },
    });

    const { data: actors, isLoading: actorsLoading, error: actorsError } = useQuery<any[]>({
        queryKey: ["actors"],
        queryFn: async () => {
            const response = await axios.get(`http://localhost:8080/api/actors`);
            return response.data.map((actor: { id: number, firstName: string; lastName: string; dateOfBirth: string; }) => ({
                id: actor.id,
                name: `${actor.firstName} ${actor.lastName}`,
                firstName: actor.firstName,
                lastName: actor.lastName,
                dateOfBirth: actor.dateOfBirth,
            }));
        },
    });

    const ratings = [
        { id: 1, value: "G", description: "General Audience" },
        { id: 2, value: "PG", description: "Parental Guidance Suggested" },
        { id: 3, value: "PG-13", description: "Parents Strongly Cautioned" },
        { id: 4, value: "R", description: "Restricted" },
        { id: 5, value: "NC-17", description: "Adults Only" },
    ];

    const validationSchema = yup.object({
        movieTitle: yup.string().min(1).required('Title is required'),
        movieLength: yup.number().min(1).required('Length is required'),
        releaseDate: yup.date().required('Release date is required'),
        trailerUrl: yup.string().url('Invalid URL').required('Trailer URL is required'),
        overview: yup.string().required('Overview is required'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });


    const onSubmit = async (data: any) => {
        const director = directors?.find((d: any) => d.value === selectedDirector);
        console.log('Selected director:', selectedDirector);
        console.log('Director object:', director);

        const releaseDate = new Date(data.releaseDate);
        releaseDate.setDate(releaseDate.getDate() + 1);

        const movieData = {
            id: 0,
            movieTitle: data.movieTitle,
            movieLength: data.movieLength,
            releaseDate: releaseDate.toISOString().split('T')[0], // Convert the modified date to the desired format
            trailerUrl: data.trailerUrl,
            director: director && {
                id: director.id,
                firstName: director.firstName,
                lastName: director.lastName,
                dateOfBirth: director.dateOfBirth,
            },
            genre: genres.find((g: any) => g.genre === selectedGenre) && {
                id: genres.find((g: any) => g.genre === selectedGenre).id,
                genre: genres.find((g: any) => g.genre === selectedGenre).genre,
            },
            rating: ratings.find((r: any) => r.value === selectedRating) && {
                id: ratings.find((r: any) => r.value === selectedRating).id,
                rating: ratings.find((r: any) => r.value === selectedRating).value,
                description: ratings.find((r: any) => r.value === selectedRating).description,
            },
            actors: selectedActors.map(id => ({ id })),
            overview: data.overview
        };

        console.log('Uploading movie data:', movieData);

        try {
            const response = await axios.post('http://localhost:8080/api/movies/', movieData);
            console.log('Movie successfully added. Server response:', response.data);
            queryClient.invalidateQueries({ queryKey: ['movies'] });
            router.push("/movies");
        } catch (error) {
            console.error('Failed to add movie:', error);
            if (axios.isAxiosError(error)) {
                console.error('Error response:', error.response?.data);
                console.error('Error status:', error.response?.status);
            }
        }
    };

    const handleActorChange = (actorId: number) => {
        setSelectedActors(prev => 
            prev.includes(actorId)
                ? prev.filter(id => id !== actorId)
                : [...prev, actorId]
        );
    };

    if (directorsLoading || actorsLoading) return <div className="text-center py-4 text-black">Loading...</div>;
    if (directorsError || actorsError) return <div className="text-center py-4 text-red-500">An error occurred: {(directorsError || actorsError)?.message}</div>;

    return (
        <div className="container mx-auto px-4 py-8">
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto">
                <h1 className="text-3xl font-bold text-black mb-4">Add New Movie</h1>
                
                <div className="mb-4">
                    <label htmlFor="movieTitle" className="block text-gray-700 text-sm font-bold mb-2">Movie Title</label>
                    <input
                    id="movieTitle"
                        {...register("movieTitle")}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errors.movieTitle && <p className="text-red-500 text-xs italic">{errors.movieTitle.message}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="movieLength" className="block text-gray-700 text-sm font-bold mb-2">Movie Length (in minutes)</label>
                    <input
                    id="movieLength"
                        {...register("movieLength")}
                        type="number"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errors.movieLength && <p className="text-red-500 text-xs italic">{errors.movieLength.message}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="releaseDate" className="block text-gray-700 text-sm font-bold mb-2">Release Date</label>
                    <input
                    id="releaseDate"
                        {...register("releaseDate")}
                        type="date"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errors.releaseDate && <p className="text-red-500 text-xs italic">{errors.releaseDate.message}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="trailerUrl" className="block text-gray-700 text-sm font-bold mb-2">Trailer URL</label>
                    <input
                    id="trailerUrl"
                        {...register("trailerUrl")}
                        placeholder="https://www.youtube.com/watch?v=uONwiZPuihU"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errors.trailerUrl && <p className="text-red-500 text-xs italic">{errors.trailerUrl.message}</p>}
                </div>

                <div className="mb-4">
                    <label htmlFor="overview" className="block text-gray-700 text-sm font-bold mb-2">Overview</label>
                    <textarea
                        id="overview"
                        {...register("overview")}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        rows={4}
                    />
                    {errors.overview && <p className="text-red-500 text-xs italic">{errors.overview.message}</p>}
                </div>

<div className="flex flex-row items-center justify-between">
                <div className="mb-4">
                    <Dropdown 
                        items={ratings.map(r => ({ value: r.value, description: r.description }))} 
                        selectedValue={selectedRating} 
                        onSelect={setSelectedRating} 
                        buttonLabel="Rating" 
                    />
                </div>

                <div className="mb-4">
                    <Dropdown 
                        items={directors?.map(d => ({ value: d.value })) ?? []} 
                        selectedValue={selectedDirector} 
                        onSelect={setSelectedDirector} 
                        buttonLabel="Director" 
                    />
                </div>

                <div className="mb-4">
                    <Dropdown 
                        items={genres.map(g => ({ value: g.genre }))} 
                        selectedValue={selectedGenre} 
                        onSelect={setSelectedGenre} 
                        buttonLabel="Genre" 
                    />
                </div>
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Actors</label>
                    <div className="max-h-60 overflow-y-auto border rounded p-2">
                        {actors?.map((actor) => (
                            <div key={actor.id} className="flex items-center mb-2">
                                <input
                                    type="checkbox"
                                    id={`actor-${actor.id}`}
                                    checked={selectedActors.includes(actor.id)}
                                    onChange={() => handleActorChange(actor.id)}
                                    className="mr-2"
                                />
                                <label htmlFor={`actor-${actor.id}`} className="text-gray-700">
                                    {actor.name}
                                </label>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Add Movie
                    </button>
                </div>
            </form>
        </div>
    );
}
