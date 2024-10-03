'use client'

import FeatureCard from "@/components/FeatureCard";
import axios from "axios";
import { useQuery } from '@tanstack/react-query';

export default function Home() {
  // const { data: directors, isLoading: isLoadingDirectors, error: errorDirectors } = useQuery<any[]>({
  //   queryKey: ['directors'],
  //   queryFn: async () => {
  //     return (await axios.get('http://localhost:8080/api/directors')).data;
  //   },
  // });

  // const { data: actors, isLoading: isLoadingActors, error: errorActors } = useQuery<any[]>({
  //   queryKey: ['actors'],
  //   queryFn: async () => {
  //     return (await axios.get('http://localhost:8080/api/actors')).data;
  //   },
  // });

  // const { data: movies, isLoading: isLoadingMovies, error: errorMovies } = useQuery<any[]>({
  //   queryKey: ['movies'],
  //   queryFn: async () => {
  //     return (await axios.get('http://localhost:8080/api/movies')).data;
  //   },
  // });

  // const featuredDirector = directors ? directors[Math.floor(Math.random() * directors.length)] : null;
  // const featuredActor = actors ? actors[Math.floor(Math.random() * actors.length)] : null;
  // const featuredMovie = movies ? movies[Math.floor(Math.random() * movies.length)] : null;

  // console.log('Featured Movie:', featuredMovie);

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-5xl font-bold mb-8 text-black">Welcome to the Movie Database</h1>
      <h2 className="text-3xl mb-8 text-black">We have movies</h2>
      <h3 className="text-1xl mb-8 text-black">and actors and directors</h3>
      {/* <h2 className="text-2xl mb-8 text-black">Featured movie, director, and actor.</h2>
      <div className="grid grid-cols-3 gap-8 mb-8">
        <FeatureCard type="director" data={featuredDirector} />
        <FeatureCard type="actor" data={featuredActor} />
        <FeatureCard type="movie" data={featuredMovie} />
      </div> */}
    </main>
  );
}

