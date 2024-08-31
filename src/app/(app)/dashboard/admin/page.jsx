"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import useProducts from '@/app/hooks/useProducts';
import { useSession } from 'next-auth/react';

const Adminpage = () => {
  const { data: session } = useSession();
  const { products, loading, error } = useProducts();

  if (loading) {
    return <div className="text-center mt-10">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">Failed to load products.</div>;
  }

  if (session?.user?.role !== "admin") {
    return <div className="text-center mt-10 text-red-500">Access Denied</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-lg rounded-lg border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 border-b text-left">S.No</th>
              <th className="py-3 px-4 border-b text-left">Product Image</th>
              <th className="py-3 px-4 border-b text-left">Name</th>
              <th className="py-3 px-4 border-b text-left">Price</th>
              <th className="py-3 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(({ _id, imageUrl, name, price }, index) => (
              <tr key={_id} className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b text-gray-600">{index + 1}</td>
                <td className="py-3 px-4 border-b">
                  <Image 
                    src={imageUrl} 
                    alt={name} 
                    width={80} 
                    height={80} 
                    className="object-cover rounded-lg"
                  />
                </td>
                <td className="py-3 px-4 border-b font-medium text-gray-800">{name}</td>
                <td className="py-3 px-4 border-b text-gray-600">${price.toFixed(2)}</td>
                <td className="py-3 px-4 border-b">
                  <div className="flex items-center">
                    <Link href={`/update-product/${_id}`} className="text-blue-600 hover:text-blue-800 mr-4">
                      Edit
                    </Link>
                    <Link href={`/delete/${_id}`} className="text-red-600 hover:text-red-800">
                      Delete
                    </Link>
                  </div>
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
