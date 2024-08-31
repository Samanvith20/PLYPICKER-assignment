"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import useProducts from "../hooks/useProducts";


const HomePage = () => {
  const { products, loading, error } = useProducts();

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-red-500">
        Failed to load products.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1  mt-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <Link key={product._id} href={`/products/${product._id}`}>
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
              <p className="text-green-600 font-bold mt-2">
                ${product.price.toFixed(2)}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default HomePage;
