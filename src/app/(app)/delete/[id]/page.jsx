"use client";

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import axios from 'axios';
import useSingleProduct from '@/app/hooks/useSingleProduct';
import Link from 'next/link';

const DeleteProduct = () => {
  const { id } = useParams();
  const router = useRouter();
  const { product, loading, error } = useSingleProduct(id);

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`/api/delete-product/${id}`);
        alert('Product deleted successfully');
        router.push('/dashboard/admin'); 
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product');
      }
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading product...</div>;
  }

  if (error || !product) {
    return <div className="text-center mt-10 text-red-500">Failed to load product.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Delete Product</h1>
      <div className="flex flex-col items-center">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
          <div className="flex justify-center mb-4">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-32 h-32 object-cover rounded-lg"
            />
          </div>
          <h2 className="text-xl font-medium mb-2">{product.name}</h2>
          <p className="text-gray-600 mb-4">${product.price.toFixed(2)}</p>
          <button
            onClick={handleDelete}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
          >
            Delete Product
          </button>
          <Link
            href="/dashboard/admin"
            className="mt-4 ml-3 inline-block text-blue-600 hover:text-blue-800"
          >
            Back to Admin Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DeleteProduct;
