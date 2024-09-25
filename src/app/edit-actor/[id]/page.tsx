"use client";

import React from 'react';
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";

export default function EditActorPage() {
  const params = useParams();
  const actorId = params.id as string;

  const { register, handleSubmit, formState: { errors } } = useForm<Actor>();

  const { data: actor, isLoading, error } = useQuery<Actor>({
    queryKey: ['actor', actorId],
    queryFn: async () => {
      const response = await axios.get<Actor>(`http://localhost:8080/api/actors/${actorId}`);
      return response.data;
    },
  });

  const onSubmit = async (data: Actor) => {
    console.log(data);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto">
        <h1 className="text-3xl font-bold text-black mb-4">Edit Actor</h1>
        
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">First Name</label>
          <input
            {...register("firstName", { required: "First name is required" })}
            defaultValue={actor?.firstName}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.firstName && <p className="text-red-500 text-xs italic">{errors.firstName.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
          <input
            {...register("lastName", { required: "Last name is required" })}
            defaultValue={actor?.lastName}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.lastName && <p className="text-red-500 text-xs italic">{errors.lastName.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="dateOfBirth" className="block text-gray-700 text-sm font-bold mb-2">Date of Birth</label>
          <input
            {...register("dateOfBirth", { required: "Date of birth is required" })}
            defaultValue={actor?.dateOfBirth}
            type="date"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.dateOfBirth && <p className="text-red-500 text-xs italic">{errors.dateOfBirth.message}</p>}
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Update Actor
          </button>
        </div>
      </form>
    </div>
  );
}