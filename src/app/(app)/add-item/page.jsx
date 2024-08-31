"use client";


import useAddItemForm from "@/app/hooks/useAddItemForm";
import { Button } from "@/components/ui/button";

export default function AddItem() {
  const {
    register,
    handleSubmit,
    errors,
    isSubmitting,
    onSubmit,
  } = useAddItemForm();

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Add New Item</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            {...register('name', { required: 'Name is required' })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            {...register('description', { required: 'Description is required' })}
            rows="4"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price</label>
          <input
            type="number"
            id="price"
            {...register('price', { required: 'Price is required' })}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image</label>
          <input
            type="file"
            id="image"
            {...register('image')}
            accept="image/*"
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
          {errors.image && <p className="text-red-500 text-sm">{errors.image.message}</p>}
        </div>

        {errors.server && <p className="text-red-500 mb-4">{errors.server.message}</p>}

        <Button
          type="submit"
          className="w-full md:w-auto bg-blue-500 text-white hover:bg-blue-600"
          variant="solid"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Adding...' : 'Add Item'}
        </Button>
      </form>
    </div>
  );
}
