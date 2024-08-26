"use client";

import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Dropdown from "@/components/Dropdown";

export default function AddMovieForm() {

    const [selectedGenre, setSelectedGenre] = useState("");
    const [selectedDirector, setSelectedDirector] = useState("");
    const [selectedRating, setSelectedRating] = useState("");


    const genres = [
        { id: 1, genre: "Action" },
    ];

    const { data: directors, isLoading, error } = useQuery<any[]>({
        queryKey: ['directors'],
        queryFn: async () => {
            const response = await axios.get('http://localhost:8080/api/directors');
            return response.data.map((director: { id: number, firstName: string; lastName: string; dateOfBirth: string; }) => ({
                id: director.id,
                value: `${director.firstName} ${director.lastName}`,
                dateOfBirth: director.dateOfBirth,
            }));
        },
    });

    const ratings = [
        { id: 1, value: "PG", description: "Suitable for all ages" },
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
        formState: { errors }
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    useEffect(() => {
        console.log(errors);
    }, [errors]);

    // Handle form submission
    const onSubmit = (data: any, e: any) => {
        e?.preventDefault();
        
        const director = directors?.find((d: any) => d.value === selectedDirector);
        const genre = genres.find((g: any) => g.genre === selectedGenre);
        const rating = ratings.find((r: any) => r.value === selectedRating);


        axios.post('http://localhost:8080/api/movies/', {
            id: 0,
            movieTitle: data.movieTitle,
            movieLength: data.movieLength,
            releaseDate: data.releaseDate,
            trailerUrl: data.trailerUrl,
            director: director ? {
                id: director.id,
                firstName: director.firstName,
                lastName: director.lastName,
                dateOfBirth: director.dateOfBirth,
            } : null,
            genre: genre ? {
                id: genre.id,
                genre: genre.genre,
            } : null,
            rating: rating ? {
                id: rating.id, 
                rating: rating.value,
                description: rating.description,
            } : null,
            actors: [],
            overview: data.overview,
        })
            .then(function (response) {
                console.log(response);
                console.log(data)
                window.location.href = "/movies"; 
            })
            .catch(function (error) {
                console.log(error);
                console.log(data)
            });
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-sm mx-auto space-y-5 pt-5">
            <div className="mb-5">
                <label className="text-black block mb-2 text-sm font-medium ">Movie Title</label>
                <input
                    {...register("movieTitle")}
                    className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-black"
                    required
                />
                {errors.movieTitle && <p className="text-red-500 text-sm">{errors.movieTitle.message}</p>}
            </div>
            <div className="mb-5">
                <label className="text-black block mb-2 text-sm font-medium ">Movie Length (in minutes)</label>
                <input
                    {...register("movieLength")}
                    type="number"
                    className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-black"
                    required
                />
                {errors.movieLength && <p className="text-red-500 text-sm">{errors.movieLength.message}</p>}
            </div>
            <div className="mb-5">
                <label className="block mb-2 text-sm font-medium text-black">Release Date</label>
                <input
                    {...register("releaseDate")}
                    type="date"
                    className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-black"
                    required
                />
                {errors.releaseDate && <p className="text-red-500 text-sm">{errors.releaseDate.message}</p>}
            </div>
            <div className="mb-5">
                <label className="text-black block mb-2 text-sm font-medium ">Trailer URL</label>
                <input
                    {...register("trailerUrl")}
                    placeholder="https://www.youtube.com/watch?v=uONwiZPuihU"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    required
                />
                {errors.trailerUrl && <p className="text-red-500 text-sm">{errors.trailerUrl.message}</p>}
            </div>
            <div className="mb-5">
                <label className="text-black block mb-2 text-sm font-medium ">Overview</label>
                <textarea
                    {...register("overview")}
                    className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 text-black"
                    required
                />
                {errors.overview && <p className="text-red-500 text-sm">{errors.overview.message}</p>}
            </div>

            <Dropdown items={ratings?.map(r => ({ value: r.value }))} selectedValue={selectedRating} onSelect={setSelectedRating} buttonLabel="Rating" />

            <Dropdown items={directors?.map(d => ({ value: d.value }))} selectedValue={selectedDirector} onSelect={setSelectedDirector} buttonLabel="Director" />

            <Dropdown items={genres.map(g => ({ value: g.genre }))} selectedValue={selectedGenre} onSelect={setSelectedGenre} buttonLabel="Genre" />

            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Add Movie
            </button>
        </form>
    );
}