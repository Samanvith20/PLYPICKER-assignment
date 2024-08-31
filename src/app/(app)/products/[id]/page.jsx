"use client";

import React, { useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import useSingleProduct from '@/app/hooks/useSingleProduct';

const ProductPage = () => {
  
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const { product, loading, error } = useSingleProduct(id)

  const handleEdit = useCallback(() => {
    if (session?.user?.role === 'admin') {
      router.push(`/update-product/${id}`);
    } else if (session?.user?.role === 'team member') {
      router.push(`/edit-product/${id}`);
    } else {
      console.log('Unauthorized access');
    }
  }, [id, router, session]);


  const handleAddToCart = useCallback(() => {
    console.log('Adding to cart:', product);
  }, [product]);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error || !product) {
    return <div className="text-center mt-10 text-red-500">Product not found or failed to load.</div>;
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="md:w-1/2">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={600}
            height={400}
            className="w-full h-auto object-cover"
            loading="lazy"
           
          />
        </div>
        <div className="md:w-1/2 p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-4xl font-semibold mb-4">{product.name}</h2>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-green-700 font-bold text-3xl mb-6">${product.price.toFixed(2)}</p>
          </div>
          <div className="flex space-x-4">
            {session?.user && (
              <button
                onClick={handleEdit}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
              >
                Edit
              </button>
            )}
            <button
              onClick={handleAddToCart}
              className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition duration-300"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductPage);
