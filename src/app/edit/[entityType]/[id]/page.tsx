"use client";

import React, { useEffect } from 'react';
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { useQueryClient } from '@tanstack/react-query';
type Entity = Actor | Director;

const EditEntityPage = ({ params }: { params: { entityType: string, id: string } }) => {
  const { entityType, id } = params;
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<Entity>();
  const queryClient = useQueryClient();

  const { data: entity, isLoading, error, refetch } = useQuery<Entity>({
    queryKey: [entityType, id],
    queryFn: async () => {
      const response = await axios.get<Entity>(`http://localhost:8080/api/${entityType}s/${id}`);
      return response.data;
    },
  });

  useEffect(() => {
    refetch();
  }, [entityType, id, refetch]);

  const onSubmit = async (data: Entity) => {
    try {
      data.id = parseInt(id);
      await axios.put(`http://localhost:8080/api/${entityType}s/${id}`, data);
      queryClient.invalidateQueries([entityType, id]);
      router.push(`/${entityType}s`);
    } catch (error) {
      console.error(`Error updating ${entityType}:`, error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto">
        <h1 className="text-3xl font-bold text-black mb-4">Edit {entityType}</h1>
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">First Name</label>
          <input
            {...register("firstName", { required: "First name is required" })}
            defaultValue={entity?.firstName}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.firstName && <p className="text-red-500 text-xs italic">{errors.firstName.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
          <input
            {...register("lastName", { required: "Last name is required" })}
            defaultValue={entity?.lastName}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.lastName && <p className="text-red-500 text-xs italic">{errors.lastName.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="dateOfBirth" className="block text-gray-700 text-sm font-bold mb-2">Date of Birth</label>
          <input
            {...register("dateOfBirth", { required: "Date of birth is required" })}
            defaultValue={entity?.dateOfBirth?.slice(0, 10)}
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
            Update {entityType}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditEntityPage;