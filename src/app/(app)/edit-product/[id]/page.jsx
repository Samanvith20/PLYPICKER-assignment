"use client";
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import useSingleProduct from '@/app/hooks/useSingleProduct';
import { useEffect, useState } from 'react';

const EditProductPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { data: session } = useSession();
  const { product, loading, error } = useSingleProduct(id);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting, errors },
  } = useForm();

  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    if (product) {
      setValue('name', product.name);
      setValue('description', product.description);
      setValue('price', product.price);
      setImagePreview(product.imageUrl); 
    }
  }, [product, setValue]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', data.price);
    if (data.image.length > 0) {
      formData.append('image', data.image[0]);
    }
    formData.append('userId', session?.user?.id);
    formData.append('productId', id);

    try {
      await axios.post('/api/reviews', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      router.push(`/`);
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">Error loading product</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen  bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Edit Product</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
            <input
              type="text"
              {...register('name', { required: 'Product name is required' })}
              placeholder="Enter product name"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              {...register('description', { required: 'Description is required' })}
              placeholder="Enter product description"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <input
              type="number"
              {...register('price', { required: 'Price is required', valueAsNumber: true })}
              placeholder="Enter product price"
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
            <input
              type="file"
              {...register('image')}
              onChange={handleImageChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {imagePreview && (
              <div className="mt-4">
                <img
                  src={imagePreview}
                  alt="Image Preview"
                  className="w-full h-auto object-cover"
                />
              </div>
            )}
          </div>
          <button 
            type="submit" 
            disabled={isSubmitting} 
            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition duration-200"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Changes for Approval'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProductPage;
