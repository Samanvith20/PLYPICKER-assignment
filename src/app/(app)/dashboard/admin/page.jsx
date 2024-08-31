"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useProducts from '@/app/hooks/useProducts';

const Adminpage = () => {
  const { products, loading, error } = useProducts();

  if (loading) {
    return <div className="text-center mt-10">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">Failed to load products.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Product Image</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">Price</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(({ _id, imageUrl, name, price }) => (
              <tr key={_id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">
                  <Image 
                    src={imageUrl} 
                    alt={name} 
                    width={50} 
                    height={50} 
                    className="object-contain"
                  />
                </td>
                <td className="py-2 px-4 border-b">{name}</td>
                <td className="py-2 px-4 border-b">${price.toFixed(2)}</td>
                <td className="py-2 px-4 border-b">
                  <Link href={`/update-product/${_id}`} className="text-blue-600 hover:text-blue-800 mr-2">
                    Edit
                  </Link>
                  <button className="text-red-600 hover:text-red-800">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Adminpage;
