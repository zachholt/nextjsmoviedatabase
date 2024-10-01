"use client";

import React from 'react';
import axios from "axios";
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

  
type Entity = Actor | Director;

const AddEntityPage = ({ params }: { params: { entityType: string } }) => {
  const { entityType } = params;
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<Entity>();

  const onSubmit = async (data: Entity) => {
    try {
      await axios.post(`http://localhost:8080/api/${entityType}s/`, data)
        .then(() => {
          router.push(`/${entityType}s`);
        });
    } catch (error) {
      console.error(`Error adding ${entityType}:`, error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto">
        <h1 className="text-3xl font-bold text-black mb-4">Add {entityType}</h1>
        
        <div className="mb-4">
          <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">First Name</label>
          <input
            {...register("firstName", { required: "First name is required" })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.firstName && <p className="text-red-500 text-xs italic">{errors.firstName.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
          <input
            {...register("lastName", { required: "Last name is required" })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {errors.lastName && <p className="text-red-500 text-xs italic">{errors.lastName.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="dateOfBirth" className="block text-gray-700 text-sm font-bold mb-2">Date of Birth</label>
          <input
            {...register("dateOfBirth", { required: "Date of birth is required" })}
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
            Add {entityType}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddEntityPage;