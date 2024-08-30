"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react'; // Import useSession
import axios from 'axios';
import Image from 'next/image';

const ProductPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession(); // Access the session data
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(`/api/products/${id}`);
          setProduct(response.data);
          setLoading(false);
        } catch (error) {
          console.error('Error fetching product:', error);
          setLoading(false);
        }
      };

      fetchProduct();
    }
  }, [id]);

  const handleEdit = () => {
    if (session?.user?.role === 'admin') {
      router.push(`/update-product/${id}`); // Redirect to update-product if user is admin
    } else if (session?.user?.role === 'team_member') {
      router.push(`/edit-product/${id}`); // Redirect to edit-product if user is a team member
    } else {
      // Optional: Handle unauthorized access or other roles
      console.log('Unauthorized access');
    }
  };

  const handleAddToCart = () => {
    console.log('Adding to cart:', product);
  };

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!product) {
    return <div className="text-center mt-10">Product not found</div>;
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
          />
        </div>
        <div className="md:w-1/2 p-6 flex flex-col justify-between">
          <div>
            <h2 className="text-4xl font-semibold mb-4">{product.name}</h2>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-green-700 font-bold text-3xl mb-6">${product.price.toFixed(2)}</p>
          </div>
          <div className="flex space-x-4">
            <button 
              onClick={handleEdit} 
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
            >
              Edit
            </button>
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

export default ProductPage;
