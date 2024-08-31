"use client"; 

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';

const AdminPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  // console.log(products)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/get-product');
        setProducts(response.data); 
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1  mt-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
       
        
        <Link key={product. _id } href={`/products/${product. _id }`}>
          
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <Image 
                src={product.imageUrl} 
                alt={product.name} 
                width={200} 
                height={192} 
                className="w-full h-48 object-contain"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-green-600 font-bold mt-2">${product.price.toFixed(2)}</p>
              </div>
            </div>
          
        </Link>
      ))}
    </div>
  );
};

export default AdminPage;
