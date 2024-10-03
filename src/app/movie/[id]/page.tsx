'use client'

import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useParams } from 'next/navigation';
import { Movie } from '../../../types/movie';

export default function Movie() {
  const params = useParams();
  const movieId = params.id as string;

  const { data: movie, isLoading, error } = useQuery<Movie>({
    queryKey: ['movie', movieId],
    queryFn: async () => {
      const response = await axios.get<Movie>(`http://localhost:8080/api/movies/${movieId}`);
      return response.data;
    },
  });

  if (isLoading) return <div className="text-center py-4 text-black">Loading...</div>;
  if (error) return <div className="text-center py-4 text-red-500">An error occurred: {error.message}</div>;
  if (!movie) return <div className="text-center py-4 text-black">No movie found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-black mb-4">{movie.movieTitle}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-gray-600"><span className="font-semibold">Length:</span> {movie.movieLength} minutes</p>
              <p className="text-gray-600"><span className="font-semibold">Release Date:</span> {new Date(movie.releaseDate).toLocaleDateString()}</p>
              <p className="text-gray-600"><span className="font-semibold">Genre:</span> {movie.genre.genre}</p>
              <p className="text-gray-600"><span className="font-semibold">Rating:</span> {movie.rating.rating} - {movie.rating.description}</p>
            </div>
            <div>
              <p className="text-gray-600"><span className="font-semibold">Director</span> {movie.director.firstName} {movie.director.lastName}</p>
              <p className="text-gray-600"><span className="font-semibold">Directors Birth Date:</span> {new Date(movie.director.dateOfBirth).toLocaleDateString()}</p>
            </div>
          </div>

          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-black mb-2">Overview</h2>
            <p className="text-gray-600">{movie.overview}</p>
          </div>

          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-black mb-2">Trailer</h2>
            <a href={movie.trailerUrl} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              Watch Trailer
            </a>
          </div>

          <div className="mt-6">
            <h2 className="text-2xl font-semibold text-black mb-2">Cast</h2>
            <ul className="list-disc pl-5">
              {movie.actors.map((actor: Actor) => (
                <li key={actor.id} className="text-gray-600">
                  {actor.firstName} {actor.lastName} (Born: {new Date(new Date(actor.dateOfBirth).getTime() + 86400000).toLocaleDateString()})
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
