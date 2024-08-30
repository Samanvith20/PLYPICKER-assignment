"use client"

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import Cropper from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const EditProductPage = () => {
  const params = useParams();
  const id = params.id;
  const router = useRouter();

  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: null,
  });
  const [loading, setLoading] = useState(true);
  const [crop, setCrop] = useState({ unit: '%', width: 30, height: 30 });
  const [croppedImageUrl, setCroppedImageUrl] = useState(null);
  const [imageFile, setImageFile] = useState(null);

  useEffect(() => {
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

    if (id) {
      fetchProduct();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setCroppedImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleCropComplete = (crop) => {
    if (!imageFile) {
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const image = new Image();
      image.src = reader.result;

      image.onload = () => {
        const canvas = document.createElement('canvas');
        const scaleX = image.width / image.naturalWidth;
        const scaleY = image.height / image.naturalHeight;
        const croppedCanvas = document.createElement('canvas');
        const ctx = croppedCanvas.getContext('2d');

        // Set canvas dimensions based on crop
        croppedCanvas.width = crop.width;
        croppedCanvas.height = crop.height;

        // Draw the cropped image
        ctx.drawImage(
          image,
          crop.x * scaleX,
          crop.y * scaleY,
          crop.width * scaleX,
          crop.height * scaleY,
          0,
          0,
          crop.width,
          crop.height
        );

        // Get the cropped image URL
        const croppedImageUrl = croppedCanvas.toDataURL('image/jpeg');
        setCroppedImageUrl(croppedImageUrl); // Update state with the cropped image URL
      };
    };

    reader.readAsDataURL(imageFile); // Read the image file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewData = {
      productId: id,
      name: product.name,
      description: product.description,
      price: product.price,
      image: croppedImageUrl, // Use the cropped image URL
      status: 'pending', // Set initial status to pending
    };

    try {
      await axios.post('/api/reviews', reviewData);
      router.push(`/`); 
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Edit Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              placeholder="Enter product name"
              required
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              placeholder="Enter product description"
              required
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              placeholder="Enter product price"
              required
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
            <input
              type="file"
              onChange={handleImageChange}
              className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {croppedImageUrl && (
              <Cropper
                src={croppedImageUrl}
                crop={crop}
                onCropChange={setCrop}
                onCropComplete={handleCropComplete}
                className="mt-4"
              />
            )}
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition duration-200">
            Submit Changes for Approval
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProductPage;
